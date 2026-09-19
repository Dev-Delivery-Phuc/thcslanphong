// Chia sẻ bộ câu hỏi bằng link, không cần database: JSON → nén deflate (CompressionStream) → base64url.
const toB64Url = (bytes) => {
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const fromB64Url = (str) => {
  const bin = atob(str.replace(/-/g, '+').replace(/_/g, '/'));
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};
const pipeBytes = async (bytes, transform) =>
  new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(transform)).arrayBuffer());

const canCompress = typeof CompressionStream !== 'undefined';

export async function encodeSet(set) {
  const compact = {
    t: set.title,
    g: set.grade,
    q: set.questions.map((q) => [q.question, q.options, q.answerIndex, q.explanation, q.fixed ? 1 : 0]),
  };
  const bytes = new TextEncoder().encode(JSON.stringify(compact));
  return canCompress ? `z${toB64Url(await pipeBytes(bytes, new CompressionStream('deflate-raw')))}` : `p${toB64Url(bytes)}`;
}

export async function decodeSet(code) {
  const kind = code?.[0];
  let bytes = fromB64Url(code.slice(1));
  if (kind === 'z') bytes = await pipeBytes(bytes, new DecompressionStream('deflate-raw'));
  else if (kind !== 'p') throw new Error('Mã không hợp lệ');

  const c = JSON.parse(new TextDecoder().decode(bytes));
  const questions = (c.q ?? [])
    .map(([question, options, answerIndex, explanation, fixed]) => ({
      question: String(question ?? ''),
      options: Array.isArray(options) ? options.map(String).slice(0, 4) : [],
      answerIndex: Number(answerIndex),
      explanation: String(explanation ?? ''),
      fixed: fixed === 1,
    }))
    .filter((q) => q.question && q.options.length >= 2 && q.answerIndex >= 0 && q.answerIndex < q.options.length);
  if (!questions.length) throw new Error('Không có câu hỏi');

  return { id: `link-${code.slice(1, 13)}`, title: String(c.t || 'Bộ câu hỏi'), grade: Number(c.g) || 8, source: 'link', questions };
}

export const shareUrl = (code) => `${location.origin}${location.pathname}#/s/${code}`;

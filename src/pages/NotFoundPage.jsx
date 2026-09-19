import Mascot from '@/components/Mascot.jsx';
import { routes } from '@/lib/router.js';

export default function NotFoundPage() {
  return (
    <main className="ready">
      <Mascot size={100} mood="oops" />
      <h1 className="display-md">Không tìm thấy trang này</h1>
      <p className="lead">Bộ câu hỏi có thể đã bị xóa hoặc link bị sai.</p>
      <a className="btn btn-sun" href={routes.home}>
        Về trang chủ
      </a>
    </main>
  );
}

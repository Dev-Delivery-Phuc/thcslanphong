import { SITE, SOURCES } from '@/config/site.js';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <p className="footer-title">{SITE.name}</p>
          <p>
            {SITE.school}
            <br />
            {SITE.location}
          </p>
        </div>
        <div>
          <p className="footer-title">Tài liệu tham khảo</p>
          <ul className="footer-sources">
            {SOURCES.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                </a>
                <span className="muted"> ({s.publisher})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

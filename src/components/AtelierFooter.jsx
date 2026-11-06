import React from 'react';
import { Icon, Link } from './ui';

export default function AtelierFooter() { return <footer className="site-footer"><div className="container footer-main"><Link className="footer-wordmark" href="/">Limon Roy Apu<span>.</span></Link><p>Built with intention.<br />Always a work in progress.</p><Link href="/#home" className="text-link">Back to top <span aria-hidden="true">↑</span></Link></div><div className="container footer-bottom mono"><span>© {new Date().getFullYear()} LIMON ROY APU</span><span>REACT + VITE / CURIOSITY + CODE</span><Link href="https://github.com/limon-l/my_profile">VIEW SOURCE <Icon size={12} /></Link></div></footer>; }

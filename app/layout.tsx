import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = { title: 'Singh Motors | Used Cars in Tickfaw, LA', description: 'Quality pre-owned vehicles, fair prices, and a better way to shop in Tickfaw, Louisiana.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }

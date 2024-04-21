import './global.css'

export const metadata = {
  title: 'Meme Generator',
  description: 'Developed by M Navneet Krishna',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

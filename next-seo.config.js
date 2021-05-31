const title = 'Bayar Sini | Get paid with a link – effortlessly'
const description =
  'Bayar Sini is a tool for small businesses to collect payments with one link. Pick a username, share your link, get paid!'

const SEO = {
  title,
  description,
  canonical: 'https://bayarsini.link',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://bayarsini.link',
    title,
    description,
    images: [
      {
        url: 'https://bayarsini.link/og.png',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
}

export default SEO

interface ISource {
  Id: string | null,
  Name: string
}

interface IArticle {
  title: string,
  author: string | null, 
  source: ISource | null,
  publishedAt: string,
  url: string
}

const validSorts: ReadonlyArray<string> = ['title', 'author', 'pubishedAt'];

export default function newsIndex(url: URL): IArticle[] {
  const search = url.searchParams.get('q');
  const from = url.searchParams.get('from');
  const to = url.searchParams.get('to');
  const sort = url.searchParams.get('sortBy');

  const fromDate = tryParseDate(from);
  const toDate = tryParseDate(to);

  const matches = articles.filter(article => {
    if(search && !matchesSearch(search, article)) {
      return false;
    }

    if(!matchesDate(article, toDate, fromDate)) {
      return false;
    }

    return true;
  });

  if(sort && sortIsValid(sort)) {
    matches.sort((a, b) => 
    {
      const firstValue = a[sort];
      const secondValue = b[sort];

      if(!firstValue && !secondValue) {
        return 0;
      }

      if(!firstValue) {
        return 1;
      }

      if(!secondValue) {
        return -1;
      }

      if(typeof firstValue !== 'string' || typeof secondValue !== 'string') {
        return 0;
      }
      
      return firstValue.localeCompare(secondValue);
    });
  }

  return matches;
}

function sortIsValid(sortString: string): sortString is keyof IArticle {
  return validSorts.includes(sortString);
}

function matchesDate(article:IArticle, to?: Date, from?: Date): boolean {
  if(!to && !from) {
    return true;
  }

  const articleDate = tryParseDate(article.publishedAt);
  if(!articleDate) {
    return false;
  }

  let matches = false;

  if(to) {
    matches = matches || articleDate < to;
  }

  if(from) {
    matches = matches || articleDate > from;
  }

  return matches;
}

function tryParseDate(dateString: string | null): Date | undefined {
  if(!dateString) {
    return undefined;
  }

  const date = new Date(dateString);

  if(isNaN(date.getTime())) {
    return undefined;
  }

  return date;
}

function matchesSearch(search:string, article: IArticle): boolean {
  return article.title.includes(search) || 
    article.author?.includes(search) ||
    article.source?.Id?.includes(search) || 
    article.source?.Name.includes(search) || false;
  
}

const articles: IArticle[] = [
   {
  "title": "Can banks push Bitcoin to clean up its act?",
  "author": "Justine Calma",
   "source": {
  "Id": "the verge",
  "Name": "The Verge"
  },
  "publishedAt": "2023 07 11T14:00:00Z",
  "url": "https://www.theverge.com/2023/7/11/23778688/bitcoin energy emissions climate change banks asset managers greenpeace"
  },
   {
  "title": "SEC Reportedly Asked Coinbase to Halt All Trading—Except for Bitcoin",
  "author": "Kevin Hurler",
   "source": {
  "Id": null,
  "Name": "Gizmodo.com"
  },
  "publishedAt": "2023 07 31T14:55:00Z",
  "url": "https://gizmodo.com/sec asked coinbase to halt trading except for bitcoin 1850691411"
  },
   {
  "title": "Bitcoin could soar to $180,000 before the April 2024 halving as potential BlackRock ETF helps drive demand, Fundstrat says",
  "author": "Matthew Fox",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 24T18:47:22Z",
  "url": "https://markets.businessinsider.com/news/currencies/bitcoin price outlook blackrock etf filing demand 180000 crypto halving 2023 7"
  },
   {
  "title": "Analysis: Partnering with Coinbase could hinder bid for bitcoin ETF approval   Reuters",
  "author": null,
   "source": {
  "Id": "google news",
  "Name": "Google News"
  },
  "publishedAt": "2023 07 13T20:05:00Z",
  "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMibWh0dHBzOi8vd3d3LnJldXRlcnMuY29tL3RlY2hub2xvZ3kvcGFydG5lcmluZy13aXRoLWNvaW5iYXNlLWNvdWxkLWhpbmRlci1iaWQtYml0Y29pbi1ldGYtYXBwcm92YWwtMjAyMy0wNy0xMy_SAQA?oc%3D5&gl=FR&hl=en US&cm=2&pc=n&src=1"
  },
   {
  "title": "Move over, bitcoin: El Salvador's sovereign bonds haven't finished rallying   Reuters.com   OltNews",
  "author": null,
   "source": {
  "Id": "google news",
  "Name": "Google News"
  },
  "publishedAt": "2023 07 19T13:13:40Z",
  "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMiZ2h0dHBzOi8vb2x0bmV3cy5jb20vbW92ZS1vdmVyLWJpdGNvaW4tZWwtc2FsdmFkb3JzLXNvdmVyZWlnbi1ib25kcy1oYXZlbnQtZmluaXNoZWQtcmFsbHlpbmctcmV1dGVycy1jb23SAQA?oc%3D5&gl=FR&hl=en US&cm=2&pc=n&src=1"
  },
   {
  "title": "Before suing Coinbase, SEC asked it to trade only in bitcoin  FT   Reuters",
  "author": null,
   "source": {
  "Id": "google news",
  "Name": "Google News"
  },
  "publishedAt": "2023 07 31T05:06:42Z",
  "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMifmh0dHBzOi8vd3d3LnJldXRlcnMuY29tL3RlY2hub2xvZ3kvc2VjLWFza2VkLWNvaW5iYXNlLXN0b3AtdHJhZGluZy1jcnlwdG9jdXJyZW5jaWVzLW90aGVyLXRoYW4tYml0Y29pbi1wcmlvci1zdWluZy0yMDIzLTA3LTMxL9IBAA?oc%3D5&gl=FR&hl=en US&cm=2&pc=n&src=1"
  },
   {
  "title": "Crypto stocks dip after bitcoin slumps to six week low   Reuters",
  "author": null,
   "source": {
  "Id": "google news",
  "Name": "Google News"
  },
  "publishedAt": "2023 08 01T13:59:00Z",
  "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMiYmh0dHBzOi8vd3d3LnJldXRlcnMuY29tL3RlY2hub2xvZ3kvY3J5cHRvLXN0b2Nrcy1kaXAtYWZ0ZXItYml0Y29pbi1zbHVtcHMtc2l4LXdlZWstbG93LTIwMjMtMDgtMDEv0gEA?oc%3D5&gl=FR&hl=en US&cm=2&pc=n&src=1"
  },
   {
  "title": "Coinbase surges after Cboe names crypto exchange in bitcoin ETF ...   Reuters",
  "author": null,
   "source": {
  "Id": "google news",
  "Name": "Google News"
  },
  "publishedAt": "2023 07 03T17:35:00Z",
  "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMid2h0dHBzOi8vd3d3LnJldXRlcnMuY29tL3RlY2hub2xvZ3kvY29pbmJhc2Utc3VyZ2VzLWFmdGVyLWNib2UtbmFtZXMtY3J5cHRvLWV4Y2hhbmdlLWJpdGNvaW4tZXRmLWFwcGxpY2F0aW9uLTIwMjMtMDctMDMv0gEA?oc%3D5&gl=FR&hl=en US&cm=2&pc=n&src=1"
  },
   {
  "title": "Move over, bitcoin: El Salvador sovereign bonds not done rallying   Reuters",
  "author": null,
   "source": {
  "Id": "google news",
  "Name": "Google News"
  },
  "publishedAt": "2023 07 19T12:25:08Z",
  "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMid2h0dHBzOi8vd3d3LnJldXRlcnMuY29tL21hcmtldHMvcmF0ZXMtYm9uZHMvbW92ZS1vdmVyLWJpdGNvaW4tZWwtc2FsdmFkb3Itc292ZXJlaWduLWJvbmRzLW5vdC1kb25lLXJhbGx5aW5nLTIwMjMtMDctMTkv0gEA?oc%3D5%26hl%3Den CA%26gl%3DCA%26ceid%3DCA:en&gl=FR&hl=en CA&cm=2&pc=n&src=1"
  },
   {
  "title": "Bitcoin could surge 300% to $120,000 next year as miners reduce token sales, Standard Chartered says",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 10T15:20:20Z",
  "url": "https://markets.businessinsider.com/news/currencies/bitcoin price outlook 120000 crypto mining profit btc sales 2023 7"
  },
   {
  "title": "US home prices are poised to tumble   while bitcoin may surge to $50,000 by December, crypto investor says",
  "author": "Theron Mohamed",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 10T11:22:16Z",
  "url": "https://markets.businessinsider.com/news/currencies/house prices commercial real estate interest rates bitcoin crypto prochain 2023 7"
  },
   {
  "title": "Bitcoin could hit a new high now that BlackRock's Larry Fink got 'orange pilled' and became a true believer, billionaire Mike Novogratz says",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 31T17:57:08Z",
  "url": "https://markets.businessinsider.com/news/currencies/bitcoin price outlook record high blackrock larry fink mike novogratz 2023 7"
  },
   {
  "title": "Bitcoin stages a comeback, rallying 25% since BlackRock filed for its crypto fund",
  "author": "George Glover",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 06T09:06:35Z",
  "url": "https://markets.businessinsider.com/news/currencies/bitcoin price crypto investing outlook blackrock spot etf larry fink 2023 7"
  },
   {
  "title": "Here's how to invest $100,000 right now, according to billionaire Mike Novogratz",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 08 01T14:28:51Z",
  "url": "https://markets.businessinsider.com/news/currencies/how to invest 100000 mike novogratz bitcoin ether gold alibaba 2023 8"
  },
   {
  "title": "A bitcoin positive feedback loop could more than quadruple the price beyond $120,000, analyst says",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 23T12:30:01Z",
  "url": "https://markets.businessinsider.com/news/currencies/bitcoin price outlook miner feedback loop 120000 ripple xrp etf 2023 7"
  },
   {
  "title": "BlackRock wants to launch a bitcoin ETF. Why now?",
  "author": "George Glover",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 10T14:02:18Z",
  "url": "https://markets.businessinsider.com/news/currencies/bitcoin crypto blackrock larry fink wall street love hate relationship 2023 7"
  },
   {
  "title": "BlackRock wants to launch a bitcoin ETF. Why now?",
  "author": "George Glover",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 10T12:00:26Z",
  "url": "https://www.businessinsider.com/bitcoin crypto blackrock larry fink wall street love hate relationship 2023 7"
  },
   {
  "title": "The 'crypto couple' is pleading guilty in their alleged $4.5 billion bitcoin heist. Here's how the saga unfolded.",
  "author": "Michelle Mark",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 31T11:58:01Z",
  "url": "https://www.businessinsider.com/crypto couple to plead guilty in 45 billion bitcoin heist 2023 7"
  },
   {
  "title": "BlackRock Has 'Responsibility To Democratize Investing', Including in Crypto, Larry Fink Says",
  "author": "msmash",
   "source": {
  "Id": null,
  "Name": "Slashdot.org"
  },
  "publishedAt": "2023 07 14T19:20:00Z",
  "url": "https://news.slashdot.org/story/23/07/14/1911231/blackrock has responsibility to democratize investing including in crypto larry fink says"
  },
   {
  "title": "Bitcoin was the only cryptocurrency the SEC asked Coinbase not to delist, CEO says",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 31T15:16:39Z",
  "url": "https://markets.businessinsider.com/news/currencies/bitcoin crypto token sec coinbase delist gary gensler brian armstrong 2023 7"
  },
   {
  "title": "Can Twitter Alternatives Escape the Enshittification Trap?",
  "author": "Gregory Barber",
   "source": {
  "Id": "wired",
  "Name": "Wired"
  },
  "publishedAt": "2023 07 07T13:00:00Z",
  "url": "https://www.wired.com/story/plaintext twitter alternatives enshittification trap/"
  },
   {
  "title": "Crypto Miner Hive Drops 'Blockchain' From Name in Pivot To AI",
  "author": "msmash",
   "source": {
  "Id": null,
  "Name": "Slashdot.org"
  },
  "publishedAt": "2023 07 12T19:23:00Z",
  "url": "https://slashdot.org/story/23/07/12/1923257/crypto miner hive drops blockchain from name in pivot to ai"
  },
   {
  "title": "US stocks fall as private payroll data suggests more Fed rate hikes are coming",
  "author": "Jennifer Sor",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 06T13:54:17Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news us economy fed interest rate hike inflation 2023 7"
  },
   {
  "title": "More than $120 million of a crypto firm's assets were moved to an unknown address   weeks after its CEO disappeared, report says",
  "author": "Zahra Tayeb",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 07T15:33:44Z",
  "url": "https://markets.businessinsider.com/news/currencies/crypto multichain 120 million assets moved unknown address ceo disappearane 2023 7"
  },
   {
  "title": "US stocks fall as Dow sheds nearly 350 points after Fitch credit rating downgrade",
  "author": "Phil Rosen",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 08 02T20:06:18Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow fitch downgrade fed debt credit 2023 8"
  },
   {
  "title": "'Rich Dad Poor Dad' author Robert Kiyosaki warns the dollar 'will die' as BRICS nations eye gold backed alternative",
  "author": "ztayeb@businessinsider.com (Zahra Tayeb)",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 12T12:15:44Z",
  "url": "https://markets.businessinsider.com/news/stocks/dedollarization greenback will die brics nations gold backed crypto kioysaki 2023 7"
  },
   {
  "title": ": Why some crypto stocks surged up to 400% this year, outperforming bitcoin",
  "author": "Frances Yue",
   "source": {
  "Id": null,
  "Name": "MarketWatch"
  },
  "publishedAt": "2023 07 18T21:23:00Z",
  "url": "https://www.marketwatch.com/story/why some crypto stocks surged up to 400 this year outperforming bitcoin 7838c938"
  },
   {
  "title": "Crypto: Bitcoin to reach $50,000 by year end, but top $100,000 by end of 2024, says Standard Chartered strategist",
  "author": "Frances Yue",
   "source": {
  "Id": null,
  "Name": "MarketWatch"
  },
  "publishedAt": "2023 07 10T19:56:00Z",
  "url": "https://www.marketwatch.com/story/bitcoin to reach 50 000 by year end but top 100 000 by end of 2024 says standard chartered strategist 78ce59d9"
  },
   {
  "title": "Fireworks and lunar glow: Supermoon to make appearance for Fourth of July   Yahoo Movies Canada",
  "author": null,
   "source": {
  "Id": "google news",
  "Name": "Google News"
  },
  "publishedAt": "2023 07 03T22:16:42Z",
  "url": "https://consent.google.com/ml?continue=https://news.google.com/rss/articles/CBMiVGh0dHBzOi8vY2EubW92aWVzLnlhaG9vLmNvbS9maXJld29ya3MtbHVuYXItZ2xvdy1zdXBlcm1vb24tYXBwZWFyYW5jZS0yMjE2NDI5NjkuaHRtbNIBXGh0dHBzOi8vY2EubW92aWVzLnlhaG9vLmNvbS9hbXBodG1sL2ZpcmV3b3Jrcy1sdW5hci1nbG93LXN1cGVybW9vbi1hcHBlYXJhbmNlLTIyMTY0Mjk2OS5odG1s?oc%3D5&gl=FR&hl=en US&cm=2&pc=n&src=1"
  },
   {
  "title": ": Coinbase stock explodes higher as enthusiasm builds for spot bitcoin ETFs",
  "author": "Emily Bary, , Frances Yue",
   "source": {
  "Id": null,
  "Name": "MarketWatch"
  },
  "publishedAt": "2023 07 03T17:54:00Z",
  "url": "https://www.marketwatch.com/story/coinbase stock explodes higher as enthusiasm builds for spot bitcoin etfs d0a68c47"
  },
   {
  "title": "Futurama's Return Is Equal Parts Nostalgic and Very, Very 2023",
  "author": "Cheryl Eddy",
   "source": {
  "Id": null,
  "Name": "Gizmodo.com"
  },
  "publishedAt": "2023 07 22T18:00:00Z",
  "url": "https://gizmodo.com/futurama hulu review matt groening bender sci fi robots 1850642374"
  },
   {
  "title": "In One Chart: Bitcoin finally decoupled from U.S. stocks. Here’s why it matters",
  "author": "Frances Yue",
   "source": {
  "Id": null,
  "Name": "MarketWatch"
  },
  "publishedAt": "2023 07 11T15:46:00Z",
  "url": "https://www.marketwatch.com/story/bitcoin finally decoupled from u s stocks heres why it matters 1888645a"
  },
   {
  "title": "Modeling Bitcoin Value with Vibes. This model has an R² of 0.97",
  "author": "allen farrington",
   "source": {
  "Id": null,
  "Name": "Medium"
  },
  "publishedAt": "2023 07 23T20:09:20Z",
  "url": "https://allenfarrington.medium.com/modeling bitcoin value with vibes 99eca0997c5f"
  },
   {
  "title": "Why it’s time to clean up AI’s carbon footprint",
  "author": "Chris Stokel Walker",
   "source": {
  "Id": null,
  "Name": "The Guardian"
  },
  "publishedAt": "2023 08 01T10:40:33Z",
  "url": "https://www.theguardian.com/technology/2023/aug/01/techscape environment cost ai artificial intelligence"
  },
   {
  "title": "Ron DeSantis Promises to Ban CBDCs if Elected President",
  "author": "Krisztian  Sandor",
   "source": {
  "Id": null,
  "Name": "Yahoo Entertainment"
  },
  "publishedAt": "2023 07 17T16:55:34Z",
  "url": "https://finance.yahoo.com/news/ron desantis promises ban cbdcs 165534149.html"
  },
   {
  "title": "US stocks climb as more signs of cooling inflation lift hopes that Fed rate hikes are near an end",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 13T13:36:11Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today cooling inflation ppi fed hikes cpi 2023 7"
  },
   {
  "title": "US stocks jump as investors cheer lowest inflation reading in over 2 years",
  "author": "Jennifer Sor",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 12T13:42:51Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news inflation june cpi report fed interest rates 2023 7"
  },
   {
  "title": "US stocks slip as investors await Fed minutes and parse China growth data",
  "author": "Max Adams",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 05T13:44:23Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today fed minutes china economy data growth 2023 7"
  },
   {
  "title": "Dow extends winning streak to 7 days as US stocks jump on strong bank earnings",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 18T20:33:12Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow industrial retail strong bank earnings 2023 7"
  },
   {
  "title": "US stocks dip as retail sales miss forecasts while earnings season ramps up",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 18T13:43:05Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow sp500 nasdaq retail sales earnings 2023 7"
  },
   {
  "title": "US stocks trade mixed as China's GDP growth disappoints and investors brace for big week of earnings",
  "author": "Max Adams",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 17T13:35:39Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today 2q earnings tech banks tesla china 2023 7"
  },
   {
  "title": "US stocks trade mixed ahead of Independence Day as investors hope to extend gains into 2nd half of 2023",
  "author": "Matthew Fox",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 03T13:48:12Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today second half gains shortened trading day 2023 7"
  },
   {
  "title": "US stocks rise as investors look to close out strong month of gains",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 31T13:36:12Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow jones sp500 nasdaq july gains 2023 7"
  },
   {
  "title": "US stocks rally as recession fears ease and investors look to upcoming Big Tech earnings",
  "author": "Jason Ma",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 17T20:11:43Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today recession outlook big tech earnings tesla 2023 7"
  },
   {
  "title": "Dow hits 8 day winning streak as investors hope for more upbeat earnings reports",
  "author": "Jennifer Sor",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 19T20:05:05Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow jones winning streak sp500 earnings 2023 7"
  },
   {
  "title": "US stocks rise with Dow heading for 10 day streak of gains as traders sift through earnings",
  "author": "Phil Rosen",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 21T13:52:38Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today indexes economy finance investors fed rates 2023 7"
  },
   {
  "title": "Dow eyes 9 day win streak as US stocks trade mixed after Tesla, Netflix earnings",
  "author": "Matthew Fox",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 20T13:33:51Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow nasdaq tesla netflix earnings tsla 2023 7"
  },
   {
  "title": "US stocks climb as the Dow heads for longest winning streak in 126 years",
  "author": "Phil Rosen",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 27T13:34:35Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow winning streak gdp fed inflation 2023 7"
  },
   {
  "title": "'Rich Dad Poor Dad' author Robert Kiyosaki says there's one event looming in coming weeks that will accelerate de dollarization of the global economy",
  "author": "Jennifer Sor",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 28T14:30:58Z",
  "url": "https://markets.businessinsider.com/news/currencies/robert kiyosaki rich dad poor dad brics summit gold dedollarization 2023 7"
  },
   {
  "title": "Dow falls more than 300 points as investors brace for more Fed tightening after huge ADP report",
  "author": "Jennifer Sor",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 06T20:05:55Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today fed rate hike inflation adp jobs 2023 7"
  },
   {
  "title": "US stocks climb as traders hope cooler June inflation means end to Fed tightening",
  "author": "Jennifer Sor",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 12T20:05:33Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today inflation cpi economy outlook fed tightening 2023 7"
  },
   {
  "title": "US stocks rise after banks set positive tone for 2nd quarter earnings",
  "author": "Matthew Fox",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 14T13:34:59Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today banks positive tone 2nd quarter earnings 2023 7"
  },
   {
  "title": "Dow notches 11th straight win as traders look to big tech earnings, Fed meeting",
  "author": "Jennifer Sor",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 24T20:11:01Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow 11th straight win tech earnings 2023 7"
  },
   {
  "title": "US stocks trade mixed amid earnings rush and fresh economic data",
  "author": "Jason Ma",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 08 01T20:07:34Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow sp500 nasdaq earnings jolts ism 2023 8"
  },
   {
  "title": "US stocks fall to begin new month after big rally in July",
  "author": "Jason Ma",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 08 01T13:35:07Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow sp500 nasdaq august july rally 2023 8"
  },
   {
  "title": "Dow snaps historic win streak as US stocks fall amid more earnings results",
  "author": "Phil Rosen",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 27T20:05:38Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow win streak ends fed gdp 2023 7"
  },
   {
  "title": "Who Accepts Bitcoin as Payment?",
  "author": "Joshua Sophy",
   "source": {
  "Id": null,
  "Name": "Small Business Trends"
  },
  "publishedAt": "2023 07 27T07:48:59Z",
  "url": "https://smallbiztrends.com/2023/07/who accepts bitcoin.html"
  },
   {
  "title": "Will Bitcoin Reach a New All Time High in 2025?",
  "author": "Dmytro Spilka",
   "source": {
  "Id": null,
  "Name": "MakeUseOf"
  },
  "publishedAt": "2023 07 28T11:01:23Z",
  "url": "https://www.makeuseof.com/will bitcoin reach new all time high 2025/"
  },
   {
  "title": ": SEC Chair Gensler dismisses industry calls for recusal on crypto decisions",
  "author": "Chris Matthews",
   "source": {
  "Id": null,
  "Name": "MarketWatch"
  },
  "publishedAt": "2023 07 12T18:41:00Z",
  "url": "https://www.marketwatch.com/story/sec chair gensler dismisses industry calls for recusal on crypto decisions 646908d8"
  },
   {
  "title": "5 Ways to Track Down Lost Bitcoin and Other Cryptos",
  "author": "Katie Rees",
   "source": {
  "Id": null,
  "Name": "MakeUseOf"
  },
  "publishedAt": "2023 07 10T12:15:18Z",
  "url": "https://www.makeuseof.com/ways track down lost bitcoin and other cryptos/"
  },
   {
  "title": "Disgraced U.S. Congressman George Santos Involved Crypto in Nigerian Prince Like Scheme: NYT",
  "author": "Brandy Betz",
   "source": {
  "Id": null,
  "Name": "Yahoo Entertainment"
  },
  "publishedAt": "2023 07 27T21:07:25Z",
  "url": "https://finance.yahoo.com/news/disgraced u congressman george santos 210725963.html"
  },
   {
  "title": "Conduit: Simple, fast and reliable chat server powered by matrix",
  "author": null,
   "source": {
  "Id": null,
  "Name": "Conduit.rs"
  },
  "publishedAt": "2023 07 31T00:51:31Z",
  "url": "https://conduit.rs/"
  },
   {
  "title": "US stocks rise ahead of big tech earnings and the Fed's next rate move",
  "author": "Jennifer Sor",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 24T13:35:42Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today faang tech earnings fed rate hike 2023 7"
  },
   {
  "title": "US stocks slide as Fed minutes show more rate hikes may be on the way",
  "author": "Phil Rosen",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 05T20:04:53Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today fed minutes rate hikes index investors 2023 7"
  },
   {
  "title": "US stocks gain to start the 2nd half of the year as traders wrap up early for Independence Day",
  "author": "Matthew Fox",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 03T17:28:48Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today second half starts with more gains 2023 7"
  },
   {
  "title": "US stocks trade mixed but notch a weekly gain as earnings impress and inflation cools",
  "author": "Matthew Fox",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 14T20:05:24Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today cool inflation earnings drive weekly gain 2023 7"
  },
   {
  "title": "US stocks trade mixed as Dow caps off its longest winning streak since 2017",
  "author": "Phil Rosen",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 21T20:04:23Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow winning streak finance banks earnings 2023 7"
  },
   {
  "title": "The Dow's win streak is at risk as US stocks drop ahead of expected Fed rate hike",
  "author": "Matthew Fox",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 26T13:36:41Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today dow win streak fed rate hike 2023 7"
  },
   {
  "title": "US stocks trade mixed as the Fed begins its 2 day policy meeting",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 25T13:36:13Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today equities fed fomc earnings soft landing 2023 7"
  },
   {
  "title": "US stocks dip as jobs report shows hiring is cooling while wage growth remains hot",
  "author": "Filip De Mott",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 07T13:43:14Z",
  "url": "https://markets.businessinsider.com/news/stocks/stock market news today stocks dip jobs report wage growth 2023 7"
  },
   {
  "title": "'Rich Dad Poor Dad' author warns of a massive crash in stocks   and fears the US economy will crater",
  "author": "Theron Mohamed",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 17T10:27:49Z",
  "url": "https://markets.businessinsider.com/news/stocks/kiyosaki rich poor dad stock market outlook crash economy depression 2023 7"
  },
   {
  "title": "BlackRock has refiled its spot bitcoin ETF application with SEC through Nasdaq and listed Coinbase as market surveillance provider to address SEC's objections (Bloomberg)",
  "author": null,
   "source": {
  "Id": null,
  "Name": "Techmeme.com"
  },
  "publishedAt": "2023 07 03T22:15:01Z",
  "url": "https://www.techmeme.com/230703/p22"
  },
   {
  "title": "Playmobil Magnum, P.I. Ferrari 308 GTS",
  "author": "Uncrate",
   "source": {
  "Id": null,
  "Name": "Uncrate.com"
  },
  "publishedAt": "2023 07 25T18:50:37Z",
  "url": "https://uncrate.com/playmobil magnum pi ferrari 308 gts/"
  },
   {
  "title": "The Crobar's Vintage Bourbon Collection",
  "author": "Uncrate",
   "source": {
  "Id": null,
  "Name": "Uncrate.com"
  },
  "publishedAt": "2023 07 06T20:54:43Z",
  "url": "https://uncrate.com/the crobars vintage bourbon collection/"
  },
   {
  "title": "Merrimack + Stranahan's Blue Peak Canoe",
  "author": "Uncrate",
   "source": {
  "Id": null,
  "Name": "Uncrate.com"
  },
  "publishedAt": "2023 08 02T21:50:47Z",
  "url": "https://uncrate.com/merrimack stranahans blue peak canoe/"
  },
   {
  "title": "Legent Yamazaki Cask Finish Blend",
  "author": "Uncrate",
   "source": {
  "Id": null,
  "Name": "Uncrate.com"
  },
  "publishedAt": "2023 08 02T21:00:01Z",
  "url": "https://uncrate.com/legent yamazaki cask finish blend/"
  },
   {
  "title": "Wilt Chamberlain's Game Worn 1972 NBA Finals Jersey",
  "author": "Uncrate",
   "source": {
  "Id": null,
  "Name": "Uncrate.com"
  },
  "publishedAt": "2023 08 02T22:52:34Z",
  "url": "https://uncrate.com/wilt chamberlains game worn 1972 nba finals jersey/"
  },
   {
  "title": "Sidebery – A Firefox extension for managing tabs and bookmarks in sidebar",
  "author": "mbnuqw",
   "source": {
  "Id": null,
  "Name": "Github.com"
  },
  "publishedAt": "2023 07 20T02:57:11Z",
  "url": "https://github.com/mbnuqw/sidebery"
  },
   {
  "title": "OSC G Force Mercedes AMG G63 6×6",
  "author": "Uncrate",
   "source": {
  "Id": null,
  "Name": "Uncrate.com"
  },
  "publishedAt": "2023 07 25T15:24:03Z",
  "url": "https://uncrate.com/osc g force mercedes amg g63 66/"
  },
   {
  "title": "Bitcoin: Buy the Dip?",
  "author": "newsfeedback@fool.com (Neil Patel)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 28T11:10:00Z",
  "url": "https://www.fool.com/investing/2023/07/28/bitcoin buy the dip/"
  },
   {
  "title": "Hashing explained for non tech people",
  "author": null,
   "source": {
  "Id": null,
  "Name": "Dvsj.in"
  },
  "publishedAt": "2023 07 31T14:42:40Z",
  "url": "https://blog.dvsj.in/hashing/"
  },
   {
  "title": "3 reasons countries around the world want to break up with the dollar",
  "author": "Huileng Tan",
   "source": {
  "Id": "business insider",
  "Name": "Business Insider"
  },
  "publishedAt": "2023 07 24T00:46:43Z",
  "url": "https://www.businessinsider.com/de dollarization reasons why countries move away us dollar 2023 7"
  },
   {
  "title": "Why the Police Won't Investigate Your Lost or Stolen Crypto",
  "author": "Katie Rees",
   "source": {
  "Id": null,
  "Name": "MakeUseOf"
  },
  "publishedAt": "2023 07 14T22:00:18Z",
  "url": "https://www.makeuseof.com/why police wont investigate lost stolen crypto/"
  },
   {
  "title": "The Bitcoin Whitepaper is Hidden in MacOS",
  "author": "Jamie Cuevas",
   "source": {
  "Id": null,
  "Name": "Osxdaily.com"
  },
  "publishedAt": "2023 07 04T16:48:06Z",
  "url": "https://osxdaily.com/2023/07/04/the bitcoin whitepaper is hidden in macos/"
  },
   {
  "title": "Bitcoin Cash's Remarkable 195% Rise: Can the Growth Continue?",
  "author": "newsfeedback@fool.com (RJ Fulton)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 14T10:45:00Z",
  "url": "https://www.fool.com/investing/2023/07/14/bitcoin cashs remarkable 165 rise can the growth c/"
  },
   {
  "title": "If You'd Invested $1,000 in Riot Platforms in 2017, This Is How Much You'd Have Today",
  "author": "newsfeedback@fool.com (Leo Sun)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 21T09:41:00Z",
  "url": "https://www.fool.com/investing/2023/07/21/if invest riot platforms 2017 how much today/"
  },
   {
  "title": "Unprecedented Scarcity Is Fueling My Bitcoin Buying Spree",
  "author": "newsfeedback@fool.com (RJ Fulton)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 07T09:37:00Z",
  "url": "https://www.fool.com/investing/2023/07/07/unrivaled scarcity fuels my bitcoin buying spree/"
  },
   {
  "title": "If This One Valuation Model Is Right, Then Bitcoin Is a Screaming Buy",
  "author": "newsfeedback@fool.com (Dominic Basulto)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 08 03T10:39:00Z",
  "url": "https://www.fool.com/investing/2023/08/03/if this one valuation model is right then bitcoin/"
  },
   {
  "title": "Who are the ransomware gangs wreaking havoc on the world’s biggest companies? | Renee Dudley",
  "author": "Renee Dudley",
   "source": {
  "Id": null,
  "Name": "The Guardian"
  },
  "publishedAt": "2023 07 17T09:00:25Z",
  "url": "https://www.theguardian.com/commentisfree/2023/jul/17/ransomware gangs companies cyber crime hackers"
  },
   {
  "title": "1 Green Flag and 1 Red Flag for Bitcoin Investors",
  "author": "newsfeedback@fool.com (Dominic Basulto)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 28T13:30:00Z",
  "url": "https://www.fool.com/investing/2023/07/28/1 green flag and 1 red flag for bitcoin investors/"
  },
   {
  "title": "How to Accept Crypto Payments as a Small Business",
  "author": "Joshua Sophy",
   "source": {
  "Id": null,
  "Name": "Small Business Trends"
  },
  "publishedAt": "2023 07 26T13:18:07Z",
  "url": "https://smallbiztrends.com/2023/07/how to accept crypto payments.html"
  },
   {
  "title": "If You Are Bullish on Bitcoin, This Skyrocketing Software Stock Is a Screaming Buy",
  "author": "newsfeedback@fool.com (Dominic Basulto)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 06T09:45:00Z",
  "url": "https://www.fool.com/investing/2023/07/06/if you are bullish on bitcoin this skyrocketing so/"
  },
   {
  "title": "Is It Time to Sell Bitcoin?",
  "author": "newsfeedback@fool.com (Anders Bylund)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 26T14:11:00Z",
  "url": "https://www.fool.com/investing/2023/07/26/is it time to sell bitcoin/"
  },
   {
  "title": "Billionaire Investor Tim Draper Is Super Bullish on Bitcoin. Here's How High He Thinks It Can Go.",
  "author": "newsfeedback@fool.com (Bram Berkowitz)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 16T13:00:00Z",
  "url": "https://www.fool.com/investing/2023/07/16/investor tim draper is super bullish on bitcoin/"
  },
   {
  "title": "Should You Invest In Bitcoin Right Now?",
  "author": "newsfeedback@fool.com (David Moadel)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 13T11:10:00Z",
  "url": "https://www.fool.com/investing/2023/07/13/should you invest in bitcoin right now/"
  },
   {
  "title": "Better Buy: Riot Platforms or Marathon Digital",
  "author": "newsfeedback@fool.com (Dominic Basulto)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 14T12:45:00Z",
  "url": "https://www.fool.com/investing/2023/07/14/better buy riot platforms or marathon digital/"
  },
   {
  "title": "Should You Buy Bitcoin While It's Still Below $40,000?",
  "author": "newsfeedback@fool.com (Neil Patel)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 14T11:59:00Z",
  "url": "https://www.fool.com/investing/2023/07/14/should you buy bitcoin while its still below 40000/"
  },
   {
  "title": "Coinbase Is The Real Winner in the Bitcoin ETF Race",
  "author": "newsfeedback@fool.com (RJ Fulton)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 08T11:30:00Z",
  "url": "https://www.fool.com/investing/2023/07/08/coinbase the real winner in the bitcoin etf race/"
  },
   {
  "title": "Better Bitcoin Stock: Riot Platforms vs. Marathon Digital",
  "author": "newsfeedback@fool.com (Leo Sun)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 11T13:01:00Z",
  "url": "https://www.fool.com/investing/2023/07/11/better bitcoin stock riot platforms vs marathon di/"
  },
   {
  "title": "My Top Growth Cryptocurrencies to Buy in July",
  "author": "newsfeedback@fool.com (Dominic Basulto)",
   "source": {
  "Id": null,
  "Name": "Motley Fool"
  },
  "publishedAt": "2023 07 07T09:45:00Z",
  "url": "https://www.fool.com/investing/2023/07/07/my top growth cryptocurrencies to buy in july/"
  }
  ];
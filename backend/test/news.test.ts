import request  from "supertest";
import app from '../src/index.js';
import * as newsIndex from '../src/mock-data.js';
import * as urlBuilder from '../src/news-url-builder.js';

describe('news endpoint', () => {
  it('should return the articles', async () => {
    /*Mocking the call to the mock-data file. 
    This is becuase if this was hoocked dup to the news api we would have to mock.*/
    const expectedArticle: newsIndex.IArticle = {
      author:'test-author',
      description:'test-description',
      publishedAt:'test-published-date',
      source: {
        Id:'test-source-id',
        Name:'test-source-name'
      },
      title:'test-title',
      url:'test-url',
      urlToImage:'test-urlToImage'};

    jest.spyOn(newsIndex, 'default').mockImplementation(() => [expectedArticle]);

    await request(app).get('/').expect(200).expect((response) => {
      expect(response.text).toBe(JSON.stringify([expectedArticle]))
    });
  });

  it('should build the news api url', async () => {
    const requestUrl = '/?sortBy=author&search=foobar&from=Wed,%2002%20Aug%202023%2023:00:00%20GMT&to=Sun,%2013%20Aug%202023%2001:23:00%20GMT';
    const expectedBuiltUrl = 'https://newsapi.org/v2/everything?q=foobar&from=Wed%2C+02+Aug+2023+23%3A00%3A00+GMT&to=Sun%2C+13+Aug+2023+01%3A23%3A00+GMT&sortBy=author&token=My-TOKEN'

    const spy = jest.spyOn(urlBuilder, 'buildIndexRequest');

    await request(app).get(requestUrl).expect(200);

    expect(expectedBuiltUrl).toBe(spy.mock.results[0]!.value.href);
  });
});
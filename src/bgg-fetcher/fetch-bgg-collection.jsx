import { XMLParser } from 'fast-xml-parser';

export async function FetchBggCollection(userName, setCollectionResults, setStatus) {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "attr_",
  };
  const parser = new XMLParser(options);

  const processResponse = (textResponse) => {
    const collectionResponse = parser.parse(textResponse);
    if (collectionResponse.message) {
      setCollectionResults([]);
      setStatus('pending');
    }
    else if (!collectionResponse.items) {
      setCollectionResults([]);
      setStatus('failed');
    }
    else {
      const apostropheRegex = /&#039;/
      const results = collectionResponse.items.item.map(result => ({
        name: result.name['#text'].replace(apostropheRegex, `'`),
        yearPublished: result.yearpublished,
        thumbnailUrl: result.thumbnail,
        id: result.attr_objectid
      }));
      console.log(collectionResponse);
      setCollectionResults(results);
      setStatus('completed');
    }
  }

  return fetch('https://boardgamegeek.com/xmlapi2/collection?own=1&stats=1&username='.concat(userName))
      .then(res => res.text())
      .then(textResponse => processResponse(textResponse))
}
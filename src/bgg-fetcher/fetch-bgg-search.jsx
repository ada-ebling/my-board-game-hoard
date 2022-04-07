import { XMLParser } from 'fast-xml-parser';

export async function FetchBggSearch(query, setSearchResults) {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "attr_",
  };
  const parser = new XMLParser(options);
  return fetch('https://boardgamegeek.com/xmlapi2/search?type=boardgame&query='.concat(query))
      .then(res => res.text())
      .then(textResponse => setSearchResults(parser.parse(textResponse).items?.item?.map(result => ({
    name: result.name?.attr_value,
    isPrimary: result.name?.attr_type === 'primary',
    type: result.attr_type,
    id: result.attr_id,
    yearPublished: result.yearpublished?.attr_value
  })) || []))
}
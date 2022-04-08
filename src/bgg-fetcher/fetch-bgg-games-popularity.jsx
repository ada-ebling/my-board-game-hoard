import { XMLParser } from 'fast-xml-parser';

export async function FetchBggGamesPopularity(ids, setGamesPopularityResults) {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "attr_",
  };
  const parser = new XMLParser(options);
  return fetch('https://boardgamegeek.com/xmlapi2/thing?type=boardgame&stats=1&id='.concat(ids.join(',')))
      .then(res => res.text())
    .then(textResponse => setGamesPopularityResults(parser.parse(textResponse).items?.item?.reduce(
      (acc, result) => {
        acc.set(result.attr_id, result.statistics.ratings.usersrated.attr_value);
        return acc;
      },
      new Map()) || new Map()))
}
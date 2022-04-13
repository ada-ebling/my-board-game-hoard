import { XMLParser } from 'fast-xml-parser';

export async function FetchBggGames(ids, setBggGames) {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix: "attr_",
  };
  const parser = new XMLParser(options);
  const apostropheRegex = /&#039;/;
  function getName(result) {
    return result.name?.constructor === Array ? result.name?.find(name => name.attr_type === 'primary') : result.name;
  }
  function parseResultIntoGame(result) {
    return {
      id: result.attr_id,
      yearPublished: result.yearpublished?.attr_value,
      name: getName(result).attr_value.replace(apostropheRegex, `'`),
      description: result.description,
      minPlayers: result.minplayers.attr_value,
      maxPlayers: result.maxplayers.attr_value,
      thumbnail: result.thumbnail,
      image: result.image,
      averageRating: result.statistics?.ratings?.average?.attr_value,
      bayesRating: result.statistics?.ratings?.bayesaverage?.attr_value,
      difficulty: result.statistics?.ratings?.averageweight?.attr_value,
      popularity: result.statistics?.ratings?.usersrated?.attr_value,
    };
  }

  return fetch('https://boardgamegeek.com/xmlapi2/thing?type=boardgame&stats=1&id='.concat(ids.join(',')))
    .then(res => res.text())
    .then(textResponse => {
      const results = parser.parse(textResponse).items?.item;
      if (ids.length === 1) {
        setBggGames([parseResultIntoGame(results)]);
      }
      else {
        setBggGames(results.map(result => parseResultIntoGame(result)) || []);
      };
    });
}
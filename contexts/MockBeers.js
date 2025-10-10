import hoppyTrailsImg from "../assets/hoppy-trails.png";
import sunsetLagerImg from "../assets/sunset-lager.png";
import midnightStoutImg from "../assets/midnight-stout.png";
import citrusAleImg from "../assets/citrus-ale.png";

const SAMPLE_BEERS = [
  {
    id: "1",
    name: "Hoppy Trails IPA",
    brewery: "Trailside Brewery",
    abv: "6.5%",
    _raw: {
      style: "American IPA",
      ibu: "65",
      country: "USA",
      category: "Craft Beer",
      description: "A bold IPA with citrus and pine notes from Cascade hops. Perfect for hop lovers seeking adventure.",
      image: hoppyTrailsImg
    }
  },
  {
    id: "2",
    name: "Sunset Lager",
    brewery: "Golden Road",
    abv: "4.7%",
    _raw: {
      style: "American Lager",
      ibu: "20",
      country: "USA",
      category: "Lager",
      description: "Smooth and crisp lager with golden hues, ideal for watching the sunset. Clean finish with subtle malt sweetness.",
      image: sunsetLagerImg
    }
  },
  {
    id: "3",
    name: "Midnight Stout",
    brewery: "Dark Harbor",
    abv: "8.2%",
    _raw: {
      style: "Russian Imperial Stout",
      ibu: "75",
      country: "USA",
      category: "Stout",
      description: "Rich and robust imperial stout with notes of dark chocolate, coffee, and roasted malt. A midnight indulgence.",
      image: midnightStoutImg
    }
  },
  {
    id: "4",
    name: "Citrus Ale",
    brewery: "Brightside Brewing",
    abv: "5.0%",
    _raw: {
      style: "American Pale Ale",
      ibu: "45",
      country: "USA",
      category: "Ale",
      description: "Bright and refreshing pale ale bursting with citrus flavors from American hops. A sunny companion for any occasion.",
      image: citrusAleImg
    }
  },
];

export default SAMPLE_BEERS;

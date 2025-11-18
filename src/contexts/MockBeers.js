import hoppyTrailsImg from "../assets/hoppy-trails.avif";
import hoppyBottleImg from "../assets/hoppy-bottle.avif";
import sunsetLagerImg from "../assets/sunset-lager.avif";
import sunsetBottleImg from "../assets/sunset-bottle.avif";
import midnightStoutImg from "../assets/midnight-stout.avif";
import midnightBottleImg from "../assets/midnight-bottle.avif";
import citrusAleImg from "../assets/citrus-ale.avif";
import citrusBottleImg from "../assets/citrus-bottle.avif";
import auroraImage from "../assets/aurora-borealis.avif";
import auroraBottleImg from "../assets/aurora-bottle.avif";

const SAMPLE_BEERS = [
  {
    id: "1",
    name: "Hoppy Trails IPA",
    brewery: "Trailside Brewery",
    abv: "6.5%",
    _raw: {
      style: "American IPA",
      abv: "6.5%",
      ibu: "65",
      country: "USA",
      region: "Oregon",
      sub_category_1: "Craft Beer",
      description:
        "A bold IPA with citrus and pine notes from Cascade hops. Perfect for hop lovers seeking adventure.",
      image: hoppyTrailsImg,
      bottleImage: hoppyBottleImg,
    },
  },
  {
    id: "2",
    name: "Sunset Lager",
    brewery: "Golden Road",
    abv: "4.7%",
    _raw: {
      style: "American Lager",
      abv: "4.7%",
      ibu: "20",
      country: "USA",
      region: "California",
      sub_category_1: "Lager",
      description:
        "Smooth and crisp lager with golden hues, ideal for watching the sunset. Clean finish with subtle malt sweetness.",
      image: sunsetLagerImg,
      bottleImage: sunsetBottleImg,
    },
  },
  {
    id: "3",
    name: "Midnight Stout",
    brewery: "Dark Harbor",
    abv: "8.2%",
    _raw: {
      style: "Imperial Stout",
      abv: "8.2%",
      ibu: "75",
      country: "USA",
      region: "Maine",
      sub_category_1: "Stout",
      description:
        "Rich and robust imperial stout with notes of dark chocolate, coffee, and roasted malt. A midnight indulgence.",
      image: midnightStoutImg,
      bottleImage: midnightBottleImg,
    },
  },
  {
    id: "4",
    name: "Citrus Ale",
    brewery: "Brightside Brewing",
    abv: "5.0%",
    _raw: {
      style: "American Pale Ale",
      abv: "5.0%",
      ibu: "45",
      country: "USA",
      region: "Florida",
      sub_category_1: "Ale",
      description:
        "Bright and refreshing pale ale bursting with citrus flavors from American hops. A sunny companion for any occasion.",
      image: citrusAleImg,
      bottleImage: citrusBottleImg,
    },
  },
  {
    id: "5",
    name: "Aurora Borealis IPA",
    brewery: "Fjord & Foam",
    abv: "9.5%",
    _raw: {
      style: "Triple IPA",
      abv: "9.5%",
      ibu: "75",
      country: "Denmark",
      region: "Copenhagen",
      sub_category_1: "Craft Beer",
      description:
        "Spruce tipped seasonal from Fjord & Foam. Pre-order and save 20%. A bold, hoppy triple IPA with notes of pine and citrus.",
      image: auroraImage,
      bottleImage: auroraBottleImg,
    },
  },
];

export default SAMPLE_BEERS;

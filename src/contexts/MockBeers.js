import hoppyTrailsImg from "../assets/hoppy-trails.avif";
import sunsetLagerImg from "../assets/sunset-lager.avif";
import midnightStoutImg from "../assets/midnight-stout.avif";
import citrusAleImg from "../assets/citrus-ale.avif";
import auroraImage from "../assets/aurora-borealis.png";

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
  {
    id: "5",
    name: "Aurora Borealis Triple IPA",
      brewery: "Fjord & Foam",
      abv: "9.5%",
      _raw: {
        style: "Triple IPA",
        ibu: "75",
        country: "Denmark",
        category: "Craft Beer",
        description: "Spruce tipped seasonal from Fjord & Foam. Pre-order and save 20%. A bold, hoppy triple IPA with notes of pine and citrus.",
        image: auroraImage
      }
  }
];

export default SAMPLE_BEERS;

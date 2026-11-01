import { CityPage, cityMetadata } from "../components/city-page";

export const metadata = cityMetadata("sofia");

export default function SofiaPage() {
  return <CityPage slug="sofia" />;
}

import { CityPage, cityMetadata } from "../components/city-page";

export const metadata = cityMetadata("pazardzhik");

export default function PazardzhikPage() {
  return <CityPage slug="pazardzhik" />;
}

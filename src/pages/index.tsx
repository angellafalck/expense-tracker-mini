import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { getCategory } from "../../api";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function Home() {
  const categories = await getCategory();

  console.log(categories);
  return (
    <div className="text-red-800">
      Hola
    </div>
  );
}

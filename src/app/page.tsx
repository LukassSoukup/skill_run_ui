import Link from "next/link";
import ProductCard from "./components/ProductCard";
import ThemeChanger from "./components/Utils/ThemeChanger";
import LandingPage from "./components/LandingPage"
export default function Home() {
  return (
    <>
      <ThemeChanger/>
      <LandingPage/>
      {/* ancer is not a good way to do routing - causes rerendering 
        <a href="/users">Users</a> 
      Better to use Link component */}
      <Link href="/users">Users</Link>
      <ProductCard/>
    </>
  );
}

// continue with the tutorial here https://youtu.be/ZVnjOPwW4ZA?t=1107

// i should be using useContext hook to distribute the changeTheme fn
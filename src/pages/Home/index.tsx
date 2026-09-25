import NeonMarquee from "@components/NeonMarquee";

import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import StackInfra from "./components/StackInfra";
import InsertCoin from "./components/InsertCoin";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <NeonMarquee
        items={[
          "FULL STACK",
          "APIS",
          "MOBILE",
          "DOCKER",
          "SELF-HOSTED",
          "POSTGRES",
          "N8N",
          "NGINX",
          "NEON NUNCA É DEMAIS",
        ]}
      />
      <About />
      <Projects />
      <StackInfra />
      <InsertCoin />
      <Contact />
    </>
  );
}

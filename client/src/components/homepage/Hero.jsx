function Hero() {
  return (
    <section className="pt-16 bg-[#FAF6F6]">
      <div className="w-full md:h-[550px] h-[250px] bg-hero bg-cover bg-bottom">
        <div className="flex justify-center items-center w-full h-full flex-col bg-bottom rounded-b-2xl bg-backPhoto bg-cover font-semibold md:space-y-10">
          <h1 className="text-white md:text-5xl">Fast and convenient</h1>
          <h1 className=" text-orange-300 md:text-7xl text-3xl">
            Everywhere, anytime
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;

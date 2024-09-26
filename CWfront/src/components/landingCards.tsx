export default function LandingCards() {
  return (
    <>
      <div>
        <section className="flex m-5 mt-20">
          <h2 className="font-serif text-2xl">
            Welcome to CodeWarts Academy, where young witches & wizards unlock
            the power of coding! Embark on a magical journey, mastering the
            spells of programming.
          </h2>
        </section>
        <section className="flex flex-wrap justify-center text-xl mt-10 mb-20">
          <div className="flip-card shadow-xl w-40 h-20 m-5">
            <div className="flip-card-inner">
              <div className="flip-card-front flex flex-col justify-center bg-purple-950 w-40 h-20 p-5">
                <h3 className="font-serif text-amber-300">
                  The Key to Unlimited Power!
                </h3>

                <img src="/MagicWant.png" width={50} className="ms-24 mt-4" />
              </div>
              <div className="flip-card-back bg-amber-400 p-10">
                <h3 className="font-serif">What Will You Create Today?</h3>
                <img src="/smoke.png" width={50} className="ms-20 mt-4" />
              </div>
            </div>
          </div>

          <div className="flip-card shadow-xl w-40 h-20 m-5">
            <div className="flip-card-inner">
              <div className="flip-card-front flex flex-col justify-center bg-purple-950 w-40 h-20 p-5">
                <h3 className="font-serif text-amber-300">
                  Master the Art of Codecraft
                </h3>
                <img src="/MagicWant.png" width={50} className="ms-24 mt-4" />
              </div>
              <div className="flip-card-back bg-amber-400 p-10">
                <h3 className="font-serif">With Code, You’re the Wizard</h3>
                <img src="/smoke.png" width={50} className="ms-20 mt-4" />
              </div>
            </div>
          </div>
          <div className="flip-card shadow-xl w-40 h-20 m-5">
            <div className="flip-card-inner">
              <div className="flip-card-front flex flex-col justify-center bg-purple-950 w-40 h-20 p-5">
                <h3 className="font-serif text-amber-300">
                  Your Adventure Starts Here!
                </h3>
                <img src="/MagicWant.png" width={50} className="ms-24 mt-4" />
              </div>
              <div className="flip-card-back bg-amber-400 p-10">
                <h3 className="font-serif">Become Code Witches and Wizards!</h3>
                <img src="/smoke.png" width={50} className="ms-20 mt-4" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

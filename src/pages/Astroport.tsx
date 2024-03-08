import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import AstroChart from "@/components/AstroChart";

const dojoswap = () => {
  const [tvl, settvl] = useState<string>();
  const [oned, setoned] = useState<number>();
  const [oneh, setoneh] = useState<number>();
  const [sevd, setsevd] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.llama.fi/protocols");
        // const response2 = await axios.get(
        //   "https://api.llama.fi/summary/dexs/astroport?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume"
        // );
        // // Volume API Testing.
        // const astroportVolume = response2.data;

        // console.log(astroportVolume);
        // const astroport24hVolume = astroportVolume.total24h;

        // console.log(astroport24hVolume);

        // Protocol (TVL) API Testing.
        const protocols = response.data;
        const astroportId = "3117";

        const coin = protocols.find(
          (protocol: { id: string }) => protocol.id === astroportId
        );
        const formatted2 = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(coin.tvl);

        settvl(formatted2);
        setoned(Math.round(coin.change_1d * 100) / 100);
        setoneh(Math.round(coin.change_1h * 100) / 100);
        setsevd(Math.round(coin.change_7d * 100) / 100);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    const interval = setInterval(() => {
      fetchData();
      // setRefetch(!refetch);
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className="flex gap-4">
        <a>
          <div className=" font-bold text-4xl p-3 ">Astroport</div>
        </a>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex gap-8 mt-10 justify-between bg-gray-900 rounded-xl">
          <div className="px-3">
            <div className="flex gap-2 pt-8 flex-col">
              <div className="text-xl ">Total Value Locked:</div>
              <div className=" text-3xl pt-1">{tvl}</div>
            </div>
            <div className="flex gap-4 pt-5 justify-between">
              <div className="text-sm ">1 Hour Change:</div>
              <div
                className={`text-sm pt-1 ${
                  oneh! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {oneh}%
              </div>
            </div>
            <div className="flex gap-4 pt-2 justify-between">
              <div className="text-sm ">24 Hour Change:</div>
              <div
                className={`text-sm pt-1 ${
                  oned! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {oned}%
              </div>
            </div>
            <div className="flex gap-4 pt-2 justify-between">
              <div className="text-sm ">7 Day Change:</div>
              <div
                className={`text-sm pt-1 ${
                  sevd! < 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                {sevd}%
              </div>
            </div>
            <div className=" flex flex-col pt-10">
              <div className="text-base">Socials</div>
              <div className=" flex flex-row gap-5 items-center">
                <a href="https://twitter.com/astroport_fi">
                  <Image
                    src={"/twitter.png"}
                    alt=""
                    height={20}
                    width={20}
                    className=" pt-5"
                  />
                </a>
                <a href="https://t.me/astroport_fi">
                  <Image
                    src={"/telegram.png"}
                    alt=""
                    height={30}
                    width={30}
                    className=" pt-5"
                  />
                </a>
                <a href="https://astroport.medium.com/">
                  <Image
                    src={"/medium.png"}
                    alt=""
                    height={30}
                    width={30}
                    className=" pt-5"
                  />
                </a>
                <a href="https://docs.astroport.fi/">
                  <Image
                    src={"/docs.png"}
                    alt=""
                    height={25}
                    width={25}
                    className=" pt-5"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className=" flex flex-col ">
            <div className="px-5 pr-16 pt-5   ">
              Astroport Total Value Locked in Injective Chain
            </div>
            <AstroChart />
          </div>
        </div>
        <div className=" px-3 text-xl">Description</div>

        <div className="  p-5 text-xl bg-gray-900 rounded-xl">
          Astroport is the central space station of the DeFi solar system, where
          travelers throughout the galaxy meet to exchange assets in a neutral
          marketplace. The philosophy behind Astroport is simple: Enabling
          decentralized, non-custodial liquidity and price discovery for any
          crypto asset. Astroport prioritizes flexibility, combining various
          specialized pool types and routing seamlessly across them.
        </div>
      </div>
    </div>
  );
};

export default dojoswap;

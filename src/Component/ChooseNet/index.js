import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import RecentImg from "../../assets/recent.png";
import FireImg from "../../assets/fire.png";
import BnbImg from "../../assets/bnb.png";
import ethImg from "../../assets/ethereum 1.png";
import avaImg from "../../assets/ava.png";
import fantImg from "../../assets/fant.png";
import polyImg from "../../assets/poly.png";
import Fox from "../../assets/fox.png";

function ChooseNet({ open, close }) {
  const [active, setActive] = useState(0);
  let tabs = [
    { name: "Popular", img: FireImg },
    { name: "All" },
    { name: "CMC", text: "New" },
    { name: "Recent", img: RecentImg },
  ];
  let network = [
    {
      name: "BNB Chain",
      img: BnbImg,
      style: "border-bnbClr text-bnbClr bg-bnbClr bg-opacity-20",
    },
    {
      name: "Ethereum",
      img: ethImg,
      style: "border-gray-700 text-gray-900 bg-gray-300 ",
    },
    {
      name: "Avalanche",
      img: avaImg,
      style: "border-avaClr text-avaClr bg-avaClr bg-opacity-20",
    },
    {
      name: "Fantom",
      img: fantImg,
      style: "border-fantClr text-fantClr bg-fantClr bg-opacity-20",
    },
    {
      name: "Polygon",
      img: polyImg,
      style: "border-polyClr text-polyClr bg-polyClr bg-opacity-20",
    },
  ];
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-40 inset-0 overflow-y-auto"
        onClose={close}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-gray-700 dark:bg-dark-100 rounded-3xl  text-left overflow-hidden shadow-xl transform transition-all sm:align-middle lg:w-[40%] md:w-[70%] sm:w-[97%] w-[100%]   ">
              <div className="bg-dark-200 rounded-t-xl border border-gray-700 ">
                <h1 className="p-4 flex justify-between items-center text-white">
                  Select a token
                  <span>
                    <AiFillCloseCircle
                      className="h-6 w-6 text-gray-400 "
                      onClick={close}
                    />
                  </span>
                </h1>
              </div>
              <div className="rounded-b-xl bg-dark-100 rounded-b-xl border border-gray-700 pb-5  ">
                <div className="px-4 py-4">
                  <input
                    className="focus:outline-none w-full bg-dark-100 border border-gray-700 rounded-lg p-3  text-white"
                    placeholder="Search name or paste contract address..."
                  />
                </div>

                <Tab.Group>
                  <Tab.List className="flex space-x-1 rounded-xl p-1">
                    {tabs.map((v, k) => (
                      <Tab
                        key={k}
                        className="focus:outline-none mt-2"
                        onClick={() => setActive(k)}
                      >
                        <div
                          className={` ${
                            active === k ? "border-b border-[#0069F2]" : ""
                          } bg-[#111722] md:text-base sm:text-sm text-xs text-white w-full px-4 py-2.5 inline-flex items-center justify-center  leading-5 font-semibold cursor-pointer`}
                        >
                          {k === 0 && (
                            <img alt="" className="mr-1 h-4 w-4" src={v.img} />
                          )}
                          {v.name}
                          <span>
                            {" "}
                            {k > 0 && v?.img && (
                              <img
                                alt=""
                                className="ml-1 h-4 w-5"
                                src={v.img}
                              />
                            )}
                          </span>
                          {k > 0 && v?.text && (
                            <div className="ml-2 border border border-blue-700 bg-blue-700 bg-opacity-20 text-blue-700 px-1 py-0.5 rounded text-xs">
                              {v.text}
                            </div>
                          )}
                        </div>
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels className="mt-2">
                    <Tab.Panel>
                      <div className="px-5">
                        <div className="grid md:grid-cols-3 grid-cols-2  gap-4 mt-5 ">
                          {network.map((v, k) => (
                            <div key={k}>
                              <div
                                className={`flex items-center gap-x-3 py-2   px-3 rounded-lg  border ${v.style} `}
                              >
                                <span>
                                  <img alt="" src={v.img} className="h-5 w-4" />
                                </span>
                                {v.name}{" "}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 space-y-3">
                          {["", "", "", "", ""].map((v, k) => (
                            <div className="flex justify-between items-center">
                              <div className="flex">
                                <div className="mr-4 flex-shrink-0 self-center">
                                  <img alt="" className="h-7 w-7" src={Fox} />
                                </div>
                                <div>
                                  <h4 className="text-sm  text-gray-200">
                                    Shib
                                  </h4>
                                  <p className="text-base font-semibold text-white mt-1">
                                    Shiba Inu
                                  </p>
                                </div>
                              </div>
                              <img alt="" src={ethImg} />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div>
                        <p className="text-center mt-5 text-gray-500">
                          No Token found
                        </p>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
export default ChooseNet;

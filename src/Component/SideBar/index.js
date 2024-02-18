import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ethers } from "ethers";
import Logo from "../../assets/logo3.png";
import { Tab } from "@headlessui/react";

export default function SideBar({
  rayBalance,
  account,
  setAccount,
  rayCoin,
  setRayBalance,
}) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [open, setOpen] = useState(false);

  let [categories] = useState({
    ["Transaction History"]: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    ["Your Token"]: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
  });
  const connectHandler = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);

      let rayBalance = await rayCoin?.balanceOf(account);
      let formatBalance = ethers.utils.formatUnits(rayBalance, 18);
      setRayBalance(formatBalance);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <>
        <Disclosure as="nav" className="bg-[#121B24]">
          {({}) => (
            <>
              <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <img src={Logo} className="h-10" />
                    <p className="text-white ml-2 font-bold">Ray Coin</p>
                  </div>
                  {account ? (
                    <>
                      <div
                        className="flex items-center"
                        onClick={() => setOpen(true)}
                      >
                        <p className=" text-sm ml-2 tracking-wider text-white hover:text-white btnColor px-4 py-2 rounded-lg cursor-pointer">
                          {account.slice(0, 6) + "..." + account.slice(38, 42)}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="flex items-center"
                        onClick={connectHandler}
                      >
                        <p className="pulse text-sm ml-2 tracking-wider text-white hover:text-white btnColor px-4 py-2 rounded-full cursor-pointer">
                          Connect Wallet
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                  </Transition.Child>

                  <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <Transition.Child
                          as={Fragment}
                          enter="transform transition ease-in-out duration-500 sm:duration-700"
                          enterFrom="translate-x-full"
                          enterTo="translate-x-0"
                          leave="transform transition ease-in-out duration-500 sm:duration-700"
                          leaveFrom="translate-x-0"
                          leaveTo="translate-x-full"
                        >
                          <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll shadow-xl bg-gray-700">
                              <div className="relative  ">
                                <div className="bg-gray-800 px-4 sm:px-6 pb-5 pt-10 ">
                                  <div className="flex justify-between items-center ">
                                    <div className="text-white flex items-center">
                                      <div className="h-14 w-14 rounded-full bg-[#FD2EAF]"></div>
                                      <div className="ml-3">
                                        <p className="text-sm">0 SOL</p>
                                        <p className="text-sm">{account?.slice(0, 6) + "..." + account?.slice(38, 42)}</p>
                                      </div>
                                    </div>
                                    <div className="flex space-x-3">
                                      <div
                                        title="Copy Address"
                                        className="p-2 border border-gray-500 bg-gray-700 rounded-full"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className=" text-white w-4 h-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
                                          />
                                        </svg>
                                      </div>
                                      <div
                                        title="Open Account"
                                        className="p-2 border border-gray-500 bg-gray-700 rounded-full"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className=" text-white w-4 h-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                          />
                                        </svg>
                                      </div>
                                      <div
                                        title="Disconnect Account"
                                        className="p-2 border border-gray-500 bg-gray-700 rounded-full"
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          strokeWidth={1.5}
                                          stroke="currentColor"
                                          className=" text-white w-4 h-4"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 8.25H7.5a2.25 2.25 0 0 0-2.25 2.25v9a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25H15M9 12l3 3m0 0 3-3m-3 3V2.25"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="mt-5">
                                    <p className="text-white text-2xl font-bold">
                                      $ {rayBalance}
                                    </p>
                                    <p className="text-white text-gray-300 text-sm">
                                      ~0 SOL
                                    </p>
                                  </div>
                                </div>

                                {/* <div className="ml-3 flex h-7 items-center">
                                    <button
                                      type="button"
                                      className="relative rounded-md text-gray-400 hover:text-gray-500 focus:outline-none "
                                      onClick={() => setOpen(false)}
                                    >
                                      <span className="absolute -inset-2.5" />
                                      <span className="sr-only">
                                        Close panel
                                      </span>
                                      <XMarkIcon
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div> */}
                              </div>
                              <div className="px-4 sm:px-6 pb-5 pt-10">
                                <Tab.Group>
                                  <Tab.List className="flex space-x-1 rounded-xl bg-gray-800 p-1">
                                    {Object.keys(categories).map((category) => (
                                      <Tab
                                        key={category}
                                        className={({ selected }) =>
                                          classNames(
                                            "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                            "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none ",
                                            selected
                                              ? "bg-gray-700 text-white shadow"
                                              : "text-white hover:text-white"
                                          )
                                        }
                                      >
                                        {category}
                                      </Tab>
                                    ))}
                                  </Tab.List>
                                  <Tab.Panels className="mt-2">
                                    <Tab.Panel>
                                      <div>
                                        <p className="text-center mt-5 text-gray-500">
                                          No transactions found
                                        </p>
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
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </>
          )}
        </Disclosure>
      </>
    </>
  );
}

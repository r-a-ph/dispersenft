import { ethers } from "ethers";
import { useContext, useEffect, useState } from "react";
import { NetworkContext } from "../App";
import Status from "./Status";

const ConfirmEther = ({
  recipientsData,
  total,
  tokenBalance,
  remaining,
  disperse,
  txStatus,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { chainId } = useContext(NetworkContext);

  useEffect(() => {
    if (total && tokenBalance) {
      setIsDisabled(!ethers.utils.parseUnits(tokenBalance).gt(total));
    }
  }, [total, tokenBalance]);

  return (
    <div className="pt-16">
      <h3 className="text-2xl font-light italic">confirm</h3>
      <ul>
        <li>
          <div className="flex justify-between mt-4">
            <p className="italic">address</p>
            <p className="italic">amount</p>
          </div>
        </li>
        {recipientsData.length > 0 &&
          recipientsData.map((recipient) => (
            <li>
              <div className="flex justify-between mt-2">
                <p>{recipient.address}</p>
                {/* TODO: Add Horizontal line here */}
                <div className="border-b-2 border-black flex-grow-1"></div>
                <p>{ethers.utils.formatEther(recipient.value)}</p>
              </div>
            </li>
          ))}
        <li>
          <div className="flex justify-between mt-6">
            <p className="italic">total</p>
            <p className="italic">
              {total ? ethers.utils.formatEther(total) : ""}
            </p>
          </div>
        </li>
        <li>
          <div className="flex justify-between mt-2">
            <p className="italic">your balance</p>
            <p className="italic">{tokenBalance}</p>
          </div>
        </li>
        <li>
          <div
            className={`flex justify-between mt-2 ${
              isDisabled && "text-red-700"
            }`}
          >
            <p className="italic">remaining</p>
            <p className="italic">{remaining}</p>
          </div>
        </li>
      </ul>
      {total && tokenBalance && (
        <div className="mt-8">
          <div className="mt-6 flex items-center ">
            <button
              onClick={disperse}
              disabled={isDisabled}
              className={`px-2 py-3 italic disabled:opacity-50 cursor-pointer ${
                isDisabled && `disabled:cursor-default`
              }`}
              style={{
                background: "#00328c",
                boxShadow: "6px 6px #f97043",
              }}
            >
              disperse ether
            </button>
            {isDisabled && <p className="ml-4 italic">total exceeds balance</p>}
            {txStatus && <Status txnStatus={txStatus} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmEther;

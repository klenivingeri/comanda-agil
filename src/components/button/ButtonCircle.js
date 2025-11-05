import Link from "next/link";
import { IconCreate } from "public/icons/Create";

export const ButtonCircle = ({ href }) => (
  <div className="relative flex  justify-center items-center w-full">
    <Link href={href} className="absolute text-white mt-[-50px] bg-[var(--button-default)] hover:bg-[var(--button-hover)] rounded-2xl p-3">
      <IconCreate size="h-[24px] w-[24px]" />
    </Link>
  </div>
);

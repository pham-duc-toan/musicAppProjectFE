"use client";
import { useRouter } from "next/navigation";

interface DivNavigationProps {
  content: string;
  link: string;
}

const DivNavigation: React.FC<DivNavigationProps> = ({ content, link }) => {
  const router = useRouter();

  return (
    <div
      style={{
        fontSize: "18px",
        fontWeight: "700",
        cursor: "pointer",
      }}
      onClick={() => router.push(`${link}`)}
    >
      {content}
    </div>
  );
};

export default DivNavigation;

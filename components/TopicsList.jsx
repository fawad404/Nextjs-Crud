import Link from "next/link";
import RemoveBtn from "@/components/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";
import { getTopics } from "../libs/mongodb";

export async function getServerSideProps() {
  const topics = await getTopics();
  return {
    props: { topics },
  };
}

export default function TopicsList({ topics }) {
  if (!topics.length) {
    return <div>No topics available.</div>;
  }

  return (
    <>
      {topics.map((t) => (
        <div key={t._id} className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
          <div>
            <h2 className="font-bold text-2xl">{t.title}</h2>
            <div>{t.description}</div>
          </div>

          <div className="flex gap-2">
            <RemoveBtn id={t._id} />
            <Link href={`/editTopic/${t._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

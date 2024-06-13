import EditTopicForm from "../../../components/EditTopicForm";

const getTopicByID = async (id) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
       
        const res = await fetch(`${apiUrl}/api/topics/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch topic. Status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Fetched data:', data);
        return data;
    } catch (err) {
        console.log('Error in getTopicByID:', err);
        return null;
    }
};

export default async function EditTopic({ params }) {
    const { id } = params;
    console.log('Received params:', params);
    const topicData = await getTopicByID(id);

    if (!topicData) {
        return <div>Error loading topic</div>;
    }

    const { topic } = topicData;
    if (!topic) {
        return <div>No topic found</div>;
    }

    const { title, description } = topic;
    console.log('Topic details:', { title, description });

    return <EditTopicForm id={id} title={title} description={description} />;
}

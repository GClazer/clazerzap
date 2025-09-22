import { Link, useParams } from "react-router";

export default function Profile() {
    let params = useParams();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to the Profile Page</h1>
            <p className="mt-4 text-lg text-gray-600">
                This is a simple profile page built with React Router and Tailwind CSS.
                {params.id && ` Viewing profile for user ID: ${params.id}`}
                <Link to="/">Go to Home</Link>
            </p>
        </div>
    );
}

import dynamic from "next/dynamic";
import { courses } from "../../courses";
import Pagi from "../../components/pagination";

export default async function Page({ params }) {
    const course = courses.classes.find(
        (course) => course.classId === params.course
    );

    function findIndexOfLesson(data, lessonName) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].lesson.includes(lessonName)) {
                return i; // Return the index of the first match
            }
        }
    }

    const Post = dynamic(
        () => import(`./${course.subject}/${params.post}.mdx`),
        {
            ssr: false,
        }
    );
    const currentLesson =
        course.lessons[findIndexOfLesson(course.lessons, params.post)];
    const currentPage = currentLesson.lesson.indexOf(params.post);

    return (
        <div className="prose flex flex-col p-8 w-full h-full">
            <Post />
            <Pagi lesson={currentLesson.lesson} page={currentPage} />
        </div>
    );
}

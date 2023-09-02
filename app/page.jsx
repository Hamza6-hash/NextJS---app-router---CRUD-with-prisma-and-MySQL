import Form from "@/components/Form";
import DeleteUser from "@/components/DeleteUser";
import UpdateComponent from "@/components/UpdateComponent";

export const dynamic = "force-dynamic";

// this is equivalent to get ServerSideProps or getStaticProp by default every nextJS fetch request uses getStaticProps which will provide build time data to user no matter how much time the user request result will same,so to avoid this we already add a line after the imports or we can add { cache: "no-store" } after the url in fetch method 
async function getUsers() {
  const res = await fetch("http://localhost:3000/api/user");
  const data = await res.json();
  return data;
}

export default async function Home() {
  const users = await getUsers();

  return (
    <main className="">
      <div className="grid grid-cols-3 gap-10">
        <div className="bg-pink-600 p-5">
          <Form />
        </div>
        <div className="">
          {users &&
            users.map((user) => (
              <div key={user.id} className="flex flex-col gap-5 p-4">
                <>
                  <h4>ID: {user.id}</h4>
                  <div className="flex gap-2">
                    <h4>FullName: {user.firstName}</h4>
                    <h4>{user.lastName}</h4>
                  </div>
                  <h4>Email: {user.email}</h4>
                  <DeleteUser userId={user.id} />
                </>
              </div>
            ))}
        </div>
        <div className="bg-pink-700">
          <UpdateComponent />
        </div>
      </div>
    </main>
  );
}

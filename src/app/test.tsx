import { GetServerSideProps } from 'next';
import clientPromise from '../lib/mongodb';
import { Provider } from '../interfaces';

export default function Providers({ providers }: { providers: Provider[] }) {
    <div>
      <h1>Providers</h1>
      {providers.map((provider) => (
        <div key={provider._id}>
          <h2>{provider.name}</h2>
          {/* Display other provider details */}
        </div>
      ))}
    </div>
 }

 export const getServerSideProps: GetServerSideProps = async () => {
   const client = await clientPromise;
   const db = client.db('your-database-name');
 
   const providers = await db.collection<Provider>('providers').find({}).toArray();
 
   return {
     props: { providers: JSON.parse(JSON.stringify(providers)) },
   };
 };
import { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import api from "../../api";

import styles from "./Trending.module.css";

interface Trend {
    id?: number;
    type: string;
    count: number;
}

const Trending = () => {

    const [trends, setTrends] = useState<Trend[]>([]);

    const [search, setSearch] = useState("");

    const [type, setType] = useState("");

    const [count, setCount] = useState<number | "">("");

    useEffect(() => {

        fetchAll();

    }, []);

    const fetchAll = async () => {

        const res = await api.get("/scam/trending");

        setTrends(res.data);

    };

    const searchTrend = async () => {

        if (!search.trim()) {

            fetchAll();

            return;

        }

        try {

            const res = await api.get(`/scam/trending/${search}`);

            setTrends(res.data);

        }

        catch {

            setTrends([]);

        }

    };

    const addTrend = async () => {

        if (!type || count === "") return;

        await api.post("/scam/trending", {

            type,

            count

        });

        setType("");

        setCount("");

        fetchAll();

    };

    const deleteTrend = async (type: string) => {

        await api.delete(`/scam/trending/${type}`);

        fetchAll();

    };

    return (

        <>

            <Header />

            <main className={styles.container}>

                <h1>Trending Scam Categories</h1>

                {/* Search */}

                <div className={styles.searchBox}>

                    <input

                        placeholder="Search Scam Type"

                        value={search}

                        onChange={(e) => setSearch(e.target.value)}

                    />

                    <button onClick={searchTrend}>

                        Search

                    </button>

                    <button onClick={fetchAll}>

                        Show All

                    </button>

                </div>

                {/* Add */}

                <div className={styles.addBox}>

                    <input

                        placeholder="Scam Type"

                        value={type}

                        onChange={(e) => setType(e.target.value)}

                    />

                    <input

                        type="number"

                        placeholder="Count"

                        value={count}

                        onChange={(e) => setCount(Number(e.target.value))}

                    />

                    <button onClick={addTrend}>

                        Add Trend

                    </button>

                </div>

                {/* Table */}

                <table>

                    <thead>

                        <tr>

                            <th>Type</th>

                            <th>Count</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            trends.map((trend) => (

                                <tr key={trend.type}>

                                    <td>{trend.type}</td>

                                    <td>{trend.count}</td>

                                    <td>

                                        <button

                                            className={styles.deleteBtn}

                                            onClick={() => deleteTrend(trend.type)}

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </main>

        </>

    );

};

export default Trending;
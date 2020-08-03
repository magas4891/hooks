import React, {useState, useEffect, useCallback, useMemo} from "react";
import ReactDOM from 'react-dom';

const App = () => {
    const [ counter, setCounter ] = useState(1);

    return(
        <div>
            <button onClick={ () => setCounter((prev) => prev + 1) }>
                +
            </button>
            <PlanetInfo id={counter} />
        </div>
    );
}

const getPlanet = (id) => {
    return fetch(`https://swapi.dev/api/planets/${id}`)
        .then(res => res.json())
        .then(data => data);
}

const useRequest = (request) => {
    const initialState = useMemo(() => ({
        data: null,
        loading: true,
        error: null
    }), []);

    const [ dataState, setDataState ] = useState(initialState);

    useEffect(() => {
        setDataState(initialState);
        let cancelled = false;
        request()
            .then(data => !cancelled && setDataState({
                data,
                loading: false,
                error: null
            }))
            .catch(error => !cancelled && setDataState({
                data: null,
                loading: false,
                error
            }));
        return () => cancelled = true;
    }, [request, initialState] );
    return dataState;
}

const usePlanetInfo = (id) => {
    const request = useCallback(
        () => getPlanet(id), [ id ]);
    return useRequest(request);
}

const PlanetInfo = ({ id }) => {

    const { data, loading, error } = usePlanetInfo(id);

    if (error) {
        return <div>Error!</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <div>{id} - Planet { data.name }</div>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
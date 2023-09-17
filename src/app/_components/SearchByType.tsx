import React, { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import PokemonTypeSelection from "@/components/PokemonTypeSelection";
import { api } from "../_trpc/client";

const SearchByType: React.FC = () => {
    const [selectedType, setSelectedType] = useState<string | undefined>(
        undefined
    );

    const [rows, setRows] = useState<any[]>([]);

    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = api.pokemons.getByType.useInfiniteQuery(
        {
            limit: 10,
            type: selectedType,
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            initialCursor: 1,
        }
    );

    useEffect(() => {
        if (data) {
            const newRows = data.pages.map((page) => page.pokemons).flat();
            setRows((prevRows) => [...prevRows, ...newRows]);
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching data</div>;
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "types", headerName: "Type", width: 200 },
    ];

    const handleTypeSelect = (type: string | undefined) => {
        setSelectedType(type);
    };

    return (
        <div>
            <PokemonTypeSelection
                selectedType={selectedType}
                selectType={handleTypeSelect}
            />
            {rows.length ? (
                <div style={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowCount={rows.length}
                        pagination
                        paginationMode="server"
                    />
                    <button
                        onClick={() => fetchNextPage()}
                        disabled={!hasNextPage || isFetchingNextPage}
                    >
                        {isFetchingNextPage
                            ? "Loading more..."
                            : hasNextPage
                            ? "Load More"
                            : "Nothing more to load"}
                    </button>
                </div>
            ) : (
                "No Data"
            )}
        </div>
    );
};

export default SearchByType;

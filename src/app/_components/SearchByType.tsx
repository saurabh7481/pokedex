import React, { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import PokemonTypeSelection from "@/components/PokemonTypeSelection";
import { api } from "../_trpc/client";
import { useTheme } from "next-themes";
import { ThemeProvider, createTheme } from "@mui/material";
import Paragraph from "./ui/Paragraph";
import Image from "next/image";

const SearchByType: React.FC = () => {
    const { theme: appTheme } = useTheme();

    const theme = createTheme({
        palette: {
            mode: appTheme === "light" ? "light" : "dark",
        },
    });
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
        {
            field: "sprite",
            headerName: "Sprite",
            width: 200,
            renderCell: (params) => (
                <Image src={params.value} alt="sprite" height={20} width={20} />
            ),
        },
    ];

    const handleTypeSelect = (type: string | undefined) => {
        if (type !== selectedType) {
            setRows([]);
        }
        setSelectedType(type);
    };

    return (
        <div className="flex-col">
            <PokemonTypeSelection
                selectedType={selectedType}
                selectType={handleTypeSelect}
            />
            {rows.length ? (
                <div className="mt-6">
                    <ThemeProvider theme={theme}>
                        <div style={{ height: 400, width: "100%" }}>
                            <DataGrid
                                rows={rows}
                                columns={columns}
                                rowCount={rows.length}
                                pagination
                                paginationMode="server"
                                style={{
                                    backgroundColor:
                                        appTheme === "light"
                                            ? "white"
                                            : "#152238",
                                    fontSize: "1rem",
                                }}
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
                    </ThemeProvider>
                </div>
            ) : (
                <Paragraph className="mt-10">
                    Results will display here.
                </Paragraph>
            )}
        </div>
    );
};

export default SearchByType;

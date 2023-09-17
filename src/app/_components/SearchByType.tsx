import React, { useEffect, useState } from "react";
import {
    DataGrid,
    GridSlotsComponentsProps,
    type GridColDef,
} from "@mui/x-data-grid";
import PokemonTypeSelection from "@/components/PokemonTypeSelection";
import { api } from "../_trpc/client";
import { useTheme } from "next-themes";
import { ThemeProvider, createTheme } from "@mui/material";
import Paragraph from "./ui/Paragraph";
import Image from "next/image";
import Button from "./ui/Button";
import { Loader2Icon } from "lucide-react";
import { Pokemon } from "@/utils/types";

// Custom footer is defined here. This will replace the default pagination footer.
declare module "@mui/x-data-grid" {
    interface FooterPropsOverrides {
        rowcount: number;
        isFetchingNextPage: boolean;
        hasNextPage: boolean | undefined;
        fetchNextPage: () => Promise<any>;
    }
}

const CustomFooter = (
    props: NonNullable<GridSlotsComponentsProps["footer"]>
) => {
    return (
        <div className="m-4 p-4 flex justify-between items-center">
            <span>
                {props.isFetchingNextPage ? (
                    <Loader2Icon className="mx-3 animate-spin" />
                ) : (
                    <span>Total Rows: {props.rowcount}</span>
                )}
            </span>
            {props.isFetchingNextPage ? (
                <Button disabled>
                    <Loader2Icon className="mr-3 animate-spin" />
                    {"Loading..."}
                </Button>
            ) : props.hasNextPage ? (
                <Button onClick={() => props.fetchNextPage?.()}>
                    {"Load More"}
                </Button>
            ) : (
                <span>That&apos;s all we have right now</span>
            )}
        </div>
    );
};

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

    const [rows, setRows] = useState<Pokemon[]>([]);

    const {
        data,
        isInitialLoading,
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
            enabled: !!selectedType,
        }
    );

    useEffect(() => {
        if (data) {
            const newRows = data.pages.map((page) => page.pokemons).flat();
            setRows((prevRows) => [...prevRows, ...newRows]);
        }
    }, [data]);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "name", headerName: "Name", width: 200 },
        { field: "types", headerName: "Type", width: 200 },
        {
            field: "sprite",
            headerName: "Sprite",
            width: 200,
            renderCell: (params) => (
                <Image
                    src={params.value}
                    alt="sprite"
                    height={100}
                    width={100}
                />
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
                                slots={{
                                    footer: CustomFooter,
                                }}
                                slotProps={{
                                    footer: {
                                        rowcount: rows.length,
                                        hasNextPage,
                                        isFetchingNextPage,
                                        fetchNextPage,
                                    },
                                }}
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
                            ></button>
                        </div>
                    </ThemeProvider>
                </div>
            ) : (
                <Paragraph className="mt-10">
                    {isInitialLoading
                        ? "Loading..."
                        : "Results will be displayed here."}
                </Paragraph>
            )}
        </div>
    );
};

export default SearchByType;

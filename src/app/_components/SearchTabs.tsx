"use client";

import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";
import SearchByName from "./SearchByName";
import SearchByMultiName from "./SearchByMultiName";
import SearchByType from "./SearchByType";

interface SearchTabsProps {}

const SearchTabs: FC<SearchTabsProps> = ({}) => {
    return (
        <Tabs defaultValue="by_name" className="max-w-2xl w-full">
            <TabsList>
                <TabsTrigger value="by_name">Search By Name</TabsTrigger>
                <TabsTrigger value="by_multiname">
                    Search By Multi Name
                </TabsTrigger>
                <TabsTrigger value="by_type">Search By Type</TabsTrigger>
            </TabsList>
            <TabsContent value="by_name">
                <SearchByName />
            </TabsContent>
            <TabsContent value="by_multiname">
                <SearchByMultiName />
            </TabsContent>
            <TabsContent value="by_type">
                <SearchByType />
            </TabsContent>
        </Tabs>
    );
};

export default SearchTabs;

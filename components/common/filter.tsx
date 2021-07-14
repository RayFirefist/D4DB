import React, { useEffect, useState } from "react";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper
} from "@material-ui/core";
import l10n from "../../utils/l10n/l10n";

const strings = new l10n();

interface FilterRuleBase {
    name: string;
    type: FilterRuleType;
}

enum FilterRuleType {
    MULTI_SELECT = "MULTI_SELECT"
}

interface FilterRule_MultiSelect extends FilterRuleBase {
    type: FilterRuleType.MULTI_SELECT;
    values: { [key: string]: string };
}

type FilterRule = FilterRule_MultiSelect;

interface FilterProps {
    rules: { [name: string]: FilterRule };
    onUpdate: (filter: Record<string, any>) => void;
}

interface FilterModuleProps {
    item: FilterRule;
    onUpdate: (x: any) => void;
}

const FilterMultiSelect: React.FC<FilterModuleProps> = ({ item, onUpdate }) => {
    const [map, setMap] = useState({});

    useEffect(() => {
        onUpdate(
            Object.entries(map)
                .filter(r => r[1])
                .map(r => r[0])
        );
    }, [map]);

    return (
        <FormControl component="fieldset">
            <FormGroup row>
                {Object.entries(item.values).map(([key, value]) => (
                    <FormControlLabel
                        key={key}
                        control={
                            <Checkbox
                                onChange={() => {
                                    setMap({
                                        ...map,
                                        [key]: !!!map[key]
                                    });
                                }}
                                value={key}
                            />
                        }
                        label={value}
                    />
                ))}
            </FormGroup>
        </FormControl>
    );
};

const filterModuleMap: Record<FilterRuleType, React.FC<FilterModuleProps>> = {
    [FilterRuleType.MULTI_SELECT]: FilterMultiSelect
};

const Filter: React.FC<FilterProps> = ({ rules, onUpdate }) => {
    const _ = strings.getString.bind(strings);
    const [filter, setFilter] = useState({});

    useEffect(() => {
        onUpdate(filter);
    }, [filter]);

    return (
        <Box>
            <Paper>
                <Grid container alignItems="center">
                    {Object.entries(rules).map(([name, obj]) => {
                        const Module = filterModuleMap[obj.type];
                        return (
                            <React.Fragment key={name}>
                                <Grid item xs={12} md={2}>
                                    {_(`FILTER__${name}`)}
                                </Grid>
                                <Grid item xs={12} md={10}>
                                    <Module
                                        item={obj}
                                        onUpdate={x => {
                                            setFilter({
                                                ...filter,
                                                [name]: x
                                            });
                                        }}
                                    />
                                </Grid>
                            </React.Fragment>
                        );
                    })}
                </Grid>
            </Paper>
        </Box>
    );
};

export default Filter;

import React from 'react';

const SpecialInfoTable = ({
    synonyms,
    otherCommonNames,
    kingdom,
    phylum,
    taxclass,
    taxorder,
    family,
    genus,
    informalTaxonomy,
}) => (
    <table class="table-auto">
        <tbody>
            <tr>
                <td>
                    <strong>Synonyms</strong>
                </td>
                <td>{synonyms}</td>
            </tr>
            <tr>
                <td>
                    <strong>Other Common Names</strong>
                </td>
                <td>{otherCommonNames}</td>
            </tr>
            <tr>
                <td>
                    <strong>Kingdom</strong>
                </td>
                <td>{kingdom}</td>
            </tr>
            <tr>
                <td>
                    <strong>Phylum</strong>
                </td>
                <td>{phylum}</td>
            </tr>
            <tr>
                <td>
                    <strong>Tax Class</strong>
                </td>
                <td>{taxclass}</td>
            </tr>
            <tr>
                <td>
                    <strong>Tax Order</strong>
                </td>
                <td>{taxorder}</td>
            </tr>
            <tr>
                <td>
                    <strong>Family</strong>
                </td>
                <td>{family}</td>
            </tr>
            <tr>
                <td>
                    <strong>Genus</strong>
                </td>
                <td>{genus}</td>
            </tr>
            <tr>
                <td>
                    <strong>Informal Taxonomy</strong>
                </td>
                <td>{informalTaxonomy}</td>
            </tr>
        </tbody>
    </table>
);

export default SpecialInfoTable;
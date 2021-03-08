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
    <table class="table-auto shadow-lg mt-4">
        <tbody>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Synonyms</strong>
                </td>
                <td class="border px-8 py-4">{synonyms}</td>
            </tr>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Other Common Names</strong>
                </td>
                <td class="border px-8 py-4">{otherCommonNames}</td>
            </tr>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Kingdom</strong>
                </td>
                <td class="border px-8 py-4">{kingdom}</td>
            </tr>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Phylum</strong>
                </td>
                <td class="border px-8 py-4">{phylum}</td>
            </tr>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Tax Class</strong>
                </td>
                <td class="border px-8 py-4">{taxclass}</td>
            </tr>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Tax Order</strong>
                </td>
                <td class="border px-8 py-4">{taxorder}</td>
            </tr>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Family</strong>
                </td>
                <td class="border px-8 py-4">{family}</td>
            </tr>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Genus</strong>
                </td>
                <td class="border px-8 py-4">{genus}</td>
            </tr>
            <tr>
                <td class="border px-8 py-4">
                    <strong>Informal Taxonomy</strong>
                </td>
                <td class="border px-8 py-4">{informalTaxonomy}</td>
            </tr>
        </tbody>
    </table>
);

export default SpecialInfoTable;
import React from 'react';
import useBreakpoints from 'utils/useBreakpoints';

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
}) => {
    const { isXs, isSm } = useBreakpoints();
    const cellStyle = isXs || isSm ? 'border px-2 py-1' : 'border px-8 py-4';

    return (
        <table className="table-auto shadow-lg mt-4">
            <tbody>
                <tr>
                    <td className={cellStyle}>
                        <strong>Synonyms</strong>
                    </td>
                    <td className={cellStyle}>{synonyms}</td>
                </tr>
                <tr>
                    <td className={cellStyle}>
                        <strong>Other Common Names</strong>
                    </td>
                    <td className={cellStyle}>{otherCommonNames}</td>
                </tr>
                <tr>
                    <td className={cellStyle}>
                        <strong>Kingdom</strong>
                    </td>
                    <td className={cellStyle}>{kingdom}</td>
                </tr>
                <tr>
                    <td className={cellStyle}>
                        <strong>Phylum</strong>
                    </td>
                    <td className={cellStyle}>{phylum}</td>
                </tr>
                <tr>
                    <td className={cellStyle}>
                        <strong>Tax Class</strong>
                    </td>
                    <td className={cellStyle}>{taxclass}</td>
                </tr>
                <tr>
                    <td className={cellStyle}>
                        <strong>Tax Order</strong>
                    </td>
                    <td className={cellStyle}>{taxorder}</td>
                </tr>
                <tr>
                    <td className={cellStyle}>
                        <strong>Family</strong>
                    </td>
                    <td className={cellStyle}>{family}</td>
                </tr>
                <tr>
                    <td className={cellStyle}>
                        <strong>Genus</strong>
                    </td>
                    <td className={cellStyle}>{genus}</td>
                </tr>
                <tr>
                    <td className={cellStyle}>
                        <strong>Informal Taxonomy</strong>
                    </td>
                    <td className={cellStyle}>{informalTaxonomy}</td>
                </tr>
            </tbody>
        </table>
    );
};

export default SpecialInfoTable;

import { ipcMain } from 'electron'
import { tabletojson } from 'tabletojson'
import { Version } from '../../shared_types/VersionTypes';

async function getWikiVersions () {

	return new Promise<Version[]>((resolve, reject) => {

		try {

			tabletojson.convertUrl('https://bg3.wiki/wiki/Patch_Notes', function (tablesAsJson) {

				// console.log(tablesAsJson);

				const versions : Version[] = tablesAsJson[0].map((table : any) => {
					return {
						date : table['Date'],
						version : table['Version Number'],
						name : table['Name']
					}
				})

				// console.log(versions);

				resolve(versions)

			})

		} catch (e) {
			reject(e);
		}

	})

}

ipcMain.handle('getWikiVersions', async (event, args) => {

	const versions = await getWikiVersions();

	return versions;

});

export default getWikiVersions;


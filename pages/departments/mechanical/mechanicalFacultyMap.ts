import type { FacultyData } from '../csds/FacultyProfileView';

import akshaySave from './faculty_akshay_save';
import avantikaPrabhu from './faculty_avantika_prabhu';
import dipakChoudhari from './faculty_dipak_choudhari';
import drAshishChaudhari from './faculty_dr_ashish_chaudhari';
import drSwapnilMane from './faculty_dr_swapnil_mane';
import drUdayAswalekar from './faculty_dr_uday_aswalekar';
import drUmeshchandraMane from './faculty_dr_umeshchandra_mane';
import gauravBhawde from './faculty_gaurav_bhawde';
import javedShaikh from './faculty_javed_shaikh';
import kamleshBachkar from './faculty_kamlesh_bachkar';
import mukundKavekar from './faculty_mukund_kavekar';
import mrunalKshirsagar from './faculty_mrunal_kshirsagar';
import pritiVairagi from './faculty_priti_vairagi';
import raahulKrishna from './faculty_raahul_krishna';
import rishabhMelwanki from './faculty_rishabh_melwanki';
import tusharkumarRaut from './faculty_tusharkumar_raut';
import vinayPatel from './faculty_vinay_patel';
import vishwasPalve from './faculty_vishwas_palve';

const map: Record<string, FacultyData> = {
  'dr-uday-aswalekar': drUdayAswalekar,
  'dr-ashish-chaudhari': drAshishChaudhari,
  'dipak-choudhari': dipakChoudhari,
  'vinay-patel': vinayPatel,
  'dr-swapnil-mane': drSwapnilMane,
  'vishwas-palve': vishwasPalve,
  'tusharkumar-raut': tusharkumarRaut,
  'priti-vairagi': pritiVairagi,
  'kamlesh-bachkar': kamleshBachkar,
  'mukund-kavekar': mukundKavekar,
  'raahul-krishna': raahulKrishna,
  'rishabh-melwanki': rishabhMelwanki,
  'dr-umeshchandra-mane': drUmeshchandraMane,
  'avantika-prabhu': avantikaPrabhu,
  'javed-shaikh': javedShaikh,
  'gaurav-bhawde': gauravBhawde,
  'akshay-save': akshaySave,
  'mrunal-kshirsagar': mrunalKshirsagar,
};

export default map;

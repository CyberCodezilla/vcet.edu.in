import type { FacultyData } from '../csds/FacultyProfileView';

import ashwiniKatkar from './faculty_ashwini_katkar';
import bharatiGondhalekar from './faculty_bharati_gondhalekar';
import dr_amrita_ruperee from './faculty_dr_amrita_ruperee';
import dr_ashish_vanmali from './faculty_dr_ashish_vanmali';
import dr_sunayana_jadhav from './faculty_dr_sunayana_jadhav';
import dr_vikas_gupta from './faculty_dr_vikas_gupta';
import kanchanSarmalkar from './faculty_kanchan_sarmalkar';
import nehaGharat from './faculty_neha_gharat';
import sampadaPimpale from './faculty_sampada_pimpale';
import sandeepPawar from './faculty_sandeep_pawar';
import sandhyaSupalkar from './faculty_sandhya_supalkar';
import shaistaKhan from './faculty_shaista_khan';
import truptiShah from './faculty_trupti_shah';

const map: Record<string, FacultyData> = {
  'dr-amrita-ruperee': dr_amrita_ruperee,
  'dr-vikas-gupta': dr_vikas_gupta,
  'dr-ashish-vanmali': dr_ashish_vanmali,
  'dr-sunayana-jadhav': dr_sunayana_jadhav,
  'shaista-khan': shaistaKhan,
  'sandhya-supalkar': sandhyaSupalkar,
  'ashwini-katkar': ashwiniKatkar,
  'neha-gharat': nehaGharat,
  'trupti-shah': truptiShah,
  'kanchan-sarmalkar': kanchanSarmalkar,
  'bharati-gondhalekar': bharatiGondhalekar,
  'sandeep-pawar': sandeepPawar,
  'sampada-pimpale': sampadaPimpale,
};

export default map;

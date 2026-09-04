import { useState } from 'react';
import { Download, FileText, Image as ImageIcon, BookOpen, Loader2, Check } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import { useToast } from '../context/ToastContext';

// ---- Azkar Booklet Content ----
const azkarContent = {
  morning: [
    { title: 'Ayat al-Kursi', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ', transliteration: 'Allahu la ilaha illa Huwal-Hayyul-Qayyum...', translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence...', ref: 'Quran 2:255', times: '1x' },
    { title: 'Surah Al-Ikhlas', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', transliteration: 'Qul Huwa-Allahu Ahad...', translation: 'Say, "He is Allah, [who is] One. Allah, the Eternal Refuge. He neither begets nor is born. Nor is there to Him any equivalent."', ref: 'Quran 112', times: '3x' },
    { title: 'Surah Al-Falaq', arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', transliteration: 'Qul a\'udhu bi Rabbil-Falaq...', translation: 'Say, "I seek refuge in the Lord of daybreak..."', ref: 'Quran 113', times: '3x' },
    { title: 'Surah An-Nas', arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ', transliteration: 'Qul a\'udhu bi Rabbin-Nas...', translation: 'Say, "I seek refuge in the Lord of mankind..."', ref: 'Quran 114', times: '3x' },
    { title: 'Sayyid al-Istighfar', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', transliteration: 'Allahumma Anta Rabbi, la ilaha illa Anta...', translation: 'O Allah, You are my Lord. None has the right to be worshipped except You...', ref: 'Bukhari #6306', times: '1x' },
  ],
  evening: [
    { title: 'Evening Praise & Sovereignty', arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلَةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ', transliteration: 'Amsayna wa amsal-mulku lillah...', translation: 'We have entered the evening and all dominion belongs to Allah...', ref: 'Muslim #2723', times: '1x' },
    { title: 'Protection Against All Harm', arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', transliteration: 'Bismillahil-ladhi la yadurru ma\'asmihi shay\'un...', translation: 'In the name of Allah with whose Name nothing on earth or in the heavens can cause harm...', ref: 'Abu Dawud #5088', times: '3x' },
  ],
};

// ---- 40 Rabbana Duas Content ----
const rabbanaDuas = [
  { num: 1, arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ', translation: 'Our Lord, accept [this] from us. Indeed, You are the Hearing, the Knowing.', ref: '2:127' },
  { num: 2, arabic: 'رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ', translation: 'Our Lord, and make us Muslims [in submission] to You and from our descendants a Muslim nation.', ref: '2:128' },
  { num: 3, arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', translation: 'Our Lord, give us in this world good and in the Hereafter good and protect us from the punishment of the Fire.', ref: '2:201' },
  { num: 4, arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ', translation: 'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.', ref: '2:250' },
  { num: 5, arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا', translation: 'Our Lord, do not impose blame upon us if we have forgotten or erred.', ref: '2:286' },
  { num: 6, arabic: 'رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا', translation: 'Our Lord, and lay not upon us a burden like that which You laid upon those before us.', ref: '2:286' },
  { num: 7, arabic: 'رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنتَ مَوْلَانَا فَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ', translation: 'Our Lord, and burden us not with that which we have no ability to bear. And pardon us; and forgive us; and have mercy upon us. You are our protector, so give us victory over the disbelieving people.', ref: '2:286' },
  { num: 8, arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً ۚ إِنَّكَ أَنتَ الْوَهَّابُ', translation: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.', ref: '3:8' },
  { num: 9, arabic: 'رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَّا رَيْبَ فِيهِ ۚ إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ', translation: 'Our Lord, surely You will gather the people for a Day about which there is no doubt. Indeed, Allah does not fail in His promise.', ref: '3:9' },
  { num: 10, arabic: 'رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ', translation: 'Our Lord, indeed we have believed, so forgive us our sins and protect us from the punishment of the Fire.', ref: '3:16' },
  { num: 11, arabic: 'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً ۖ إِنَّكَ سَمِيعُ الدُّعَاءِ', translation: 'My Lord, grant me from Yourself a good offspring. Indeed, You are the Hearer of supplication.', ref: '3:38' },
  { num: 12, arabic: 'رَبَّنَا آمَنَّا بِمَا أَنزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ', translation: 'Our Lord, we have believed in what You revealed and have followed the messenger, so register us among the witnesses.', ref: '3:53' },
  { num: 13, arabic: 'رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ', translation: 'Our Lord, forgive us our sins and the excess in our affairs and plant firmly our feet and give us victory over the disbelieving people.', ref: '3:147' },
  { num: 14, arabic: 'رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ', translation: 'Our Lord, You did not create this aimlessly; exalted are You; then protect us from the punishment of the Fire.', ref: '3:191' },
  { num: 15, arabic: 'رَبَّنَا إِنَّكَ مَن تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ ۖ وَمَا لِلظَّالِمِينَ مِنْ أَنصَارٍ', translation: 'Our Lord, indeed whoever You admit to the Fire — You have disgraced him, and for the wrongdoers there are no helpers.', ref: '3:192' },
  { num: 16, arabic: 'رَّبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلْإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا', translation: 'Our Lord, indeed we have heard a caller calling to faith, "Believe in your Lord," and we have believed.', ref: '3:193' },
  { num: 17, arabic: 'رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ', translation: 'Our Lord, so forgive us our sins and remove from us our misdeeds and cause us to die with the righteous.', ref: '3:193' },
  { num: 18, arabic: 'رَبَّنَا وَآتِنَا مَا وَعَدتَّنَا عَلَىٰ رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ الْقِيَامَةِ ۗ إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ', translation: 'Our Lord, and grant us what You promised us through Your messengers and do not disgrace us on the Day of Resurrection. Indeed, You do not fail in [Your] promise.', ref: '3:194' },
  { num: 19, arabic: 'رَبَّنَا أَخْرِجْنَا مِنْ هَٰذِهِ الْقَرْيَةِ الظَّالِمِ أَهْلُهَا وَاجْعَل لَّنَا مِن لَّدُنكَ وَلِيًّا وَاجْعَل لَّنَا مِن لَّدُنكَ نَصِيرًا', translation: 'Our Lord, take us out of this city of oppressive people and appoint for us from Yourself a protector and appoint for us from Yourself a helper.', ref: '4:75' },
  { num: 20, arabic: 'رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ', translation: 'Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers.', ref: '7:23' },
  { num: 21, arabic: 'رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ', translation: 'Our Lord, do not place us with the wrongdoing people.', ref: '7:47' },
  { num: 22, arabic: 'رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ وَأَنتَ خَيْرُ الْفَاتِحِينَ', translation: 'Our Lord, decide between us and our people in truth, and You are the best of those who give decision.', ref: '7:89' },
  { num: 23, arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ', translation: 'Our Lord, pour upon us patience and let us die as Muslims.', ref: '7:126' },
  { num: 24, arabic: 'رَبَّنَا لَا تَجْعَلْنَا فِتْنَةً لِّلْقَوْمِ الظَّالِمِينَ ۝ وَنَجِّنَا بِرَحْمَتِكَ مِنَ الْقَوْمِ الْكَافِرِينَ', translation: 'Our Lord, make us not [objects of] trial for the wrongdoing people. And save us by Your mercy from the disbelieving people.', ref: '10:85-86' },
  { num: 25, arabic: 'رَبَّنَا إِنَّكَ تَعْلَمُ مَا نُخْفِي وَمَا نُعْلِنُ ۗ وَمَا يَخْفَىٰ عَلَى اللَّهِ مِن شَيْءٍ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ', translation: 'Our Lord, indeed You know what we conceal and what we declare, and nothing is hidden from Allah on the earth or in the heaven.', ref: '14:38' },
  { num: 26, arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ', translation: 'My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication.', ref: '14:40' },
  { num: 27, arabic: 'رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ', translation: 'Our Lord, forgive me and my parents and the believers the Day the account is established.', ref: '14:41' },
  { num: 28, arabic: 'رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا', translation: 'Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance.', ref: '18:10' },
  { num: 29, arabic: 'رَبَّنَا إِنَّنَا نَخَافُ أَن يَفْرُطَ عَلَيْنَا أَوْ أَن يَطْغَىٰ', translation: 'Our Lord, indeed we are afraid that he will hasten [punishment] against us or that he will transgress.', ref: '20:45' },
  { num: 30, arabic: 'رَبَّنَا آمَنَّا فَاغْفِرْ لَنَا وَارْحَمْنَا وَأَنتَ خَيْرُ الرَّاحِمِينَ', translation: 'Our Lord, we have believed, so forgive us and have mercy upon us, and You are the best of the merciful.', ref: '23:109' },
  { num: 31, arabic: 'رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا', translation: 'Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering.', ref: '25:65' },
  { num: 32, arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا', translation: 'Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous.', ref: '25:74' },
  { num: 33, arabic: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَىٰ وَالِدَيَّ', translation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me and upon my parents.', ref: '27:19' },
  { num: 34, arabic: 'رَبَّنَا وَسِعْتَ كُلَّ شَيْءٍ رَّحْمَةً وَعِلْمًا فَاغْفِرْ لِلَّذِينَ تَابُوا وَاتَّبَعُوا سَبِيلَكَ وَقِهِمْ عَذَابَ الْجَحِيمِ', translation: 'Our Lord, You have encompassed all things in mercy and knowledge, so forgive those who have repented and followed Your way and protect them from the punishment of Hellfire.', ref: '40:7' },
  { num: 35, arabic: 'رَبَّنَا وَأَدْخِلْهُمْ جَنَّاتِ عَدْنٍ الَّتِي وَعَدتَّهُمْ وَمَن صَلَحَ مِنْ آبَائِهِمْ وَأَزْوَاجِهِمْ وَذُرِّيَّاتِهِمْ', translation: 'Our Lord, and admit them to gardens of perpetual residence which You have promised them and whoever was righteous among their fathers, their spouses and their offspring.', ref: '40:8' },
  { num: 36, arabic: 'رَبَّنَا اكْشِفْ عَنَّا الْعَذَابَ إِنَّا مُؤْمِنُونَ', translation: 'Our Lord, remove from us the torment; indeed, we are believers.', ref: '44:12' },
  { num: 37, arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ', translation: 'Our Lord, forgive us and our brothers who preceded us in faith.', ref: '59:10' },
  { num: 38, arabic: 'رَبَّنَا لَا تَجْعَلْ فِي قُلُوبِنَا غِلًّا لِّلَّذِينَ آمَنُوا رَبَّنَا إِنَّكَ رَءُوفٌ رَّحِيمٌ', translation: 'Our Lord, and put not in our hearts [any] resentment toward those who have believed. Our Lord, indeed You are Kind and Merciful.', ref: '59:10' },
  { num: 39, arabic: 'رَبَّنَا عَلَيْكَ تَوَكَّلْنَا وَإِلَيْكَ أَنَبْنَا وَإِلَيْكَ الْمَصِيرُ', translation: 'Our Lord, upon You we have relied, and to You we have returned, and to You is the destination.', ref: '60:4' },
  { num: 40, arabic: 'رَبَّنَا أَتْمِمْ لَنَا نُورَنَا وَاغْفِرْ لَنَا ۖ إِنَّكَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', translation: 'Our Lord, perfect for us our light and forgive us. Indeed, You are over all things competent.', ref: '66:8' },
];

// ---- HTML Document Generator ----
function generateHtmlDocument(title, bodyContent) {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} — Rah-e-Hidayat</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Inter:wght@400;600;700&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #FAF8F2; color: #142015; padding: 2rem; line-height: 1.8; }
    .header { text-align: center; padding: 2rem 0 1.5rem; border-bottom: 2px solid #0F5132; margin-bottom: 2rem; }
    .header h1 { font-family: 'Inter', sans-serif; font-size: 1.75rem; color: #0F5132; margin-bottom: 0.5rem; }
    .header p { font-size: 0.875rem; color: #536555; }
    .section-title { font-size: 1.25rem; font-weight: 700; color: #0F5132; margin: 2rem 0 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid #E7F4ED; }
    .item { margin-bottom: 2rem; padding: 1.5rem; border: 1px solid rgba(15,81,50,0.12); border-radius: 0.75rem; background: #fff; page-break-inside: avoid; }
    .item-title { font-weight: 700; font-size: 1rem; color: #142015; margin-bottom: 0.25rem; }
    .item-ref { font-size: 0.75rem; color: #0F5132; font-weight: 600; }
    .item-times { font-size: 0.7rem; color: #8E6D24; font-weight: 700; background: #FDF7E7; padding: 2px 8px; border-radius: 999px; display: inline-block; margin-left: 0.5rem; }
    .arabic { font-family: 'Amiri', serif; direction: rtl; text-align: right; font-size: 1.5rem; line-height: 2.4; color: #142015; margin: 1rem 0; font-weight: 500; }
    .transliteration { font-size: 0.85rem; color: #8E6D24; font-style: italic; margin-bottom: 0.5rem; }
    .translation { font-size: 0.875rem; color: #536555; line-height: 1.7; }
    .footer { text-align: center; margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid rgba(15,81,50,0.12); font-size: 0.75rem; color: #7A8D7C; }
    @media print { body { padding: 1rem; } .item { border: 1px solid #ddd; } }
  </style>
</head>
<body>
  ${bodyContent}
  <div class="footer">
    <p>Generated by <strong>Rah-e-Hidayat</strong> — Walk the Path of Guidance</p>
    <p style="margin-top:0.25rem;">This document is for personal use. Please verify all texts with authentic sources.</p>
  </div>
</body>
</html>`;
}

function generateAzkarBookletHtml() {
  let body = `<div class="header"><h1>☀️ Authentic Morning & Evening Azkar</h1><p>Complete Arabic text with transliteration, English translation, and Hadith references.</p></div>`;

  body += `<h2 class="section-title">☀️ Morning Azkar</h2>`;
  azkarContent.morning.forEach(item => {
    body += `<div class="item"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;"><span class="item-title">${item.title}</span><span><span class="item-ref">${item.ref}</span><span class="item-times">${item.times}</span></span></div><div class="arabic">${item.arabic}</div><p class="transliteration">${item.transliteration}</p><p class="translation">${item.translation}</p></div>`;
  });

  body += `<h2 class="section-title">🌙 Evening Azkar</h2>`;
  azkarContent.evening.forEach(item => {
    body += `<div class="item"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;"><span class="item-title">${item.title}</span><span><span class="item-ref">${item.ref}</span><span class="item-times">${item.times}</span></span></div><div class="arabic">${item.arabic}</div><p class="transliteration">${item.transliteration}</p><p class="translation">${item.translation}</p></div>`;
  });

  return generateHtmlDocument('Authentic Morning & Evening Azkar Booklet', body);
}

function generateRabbanaDuasHtml() {
  let body = `<div class="header"><h1>🤲 40 Rabbana Duas from the Holy Quran</h1><p>All 40 Quranic supplications starting with "Rabbana" with Surah and Ayah references.</p></div>`;

  rabbanaDuas.forEach(dua => {
    body += `<div class="item"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;"><span class="item-title">Dua #${dua.num}</span><span class="item-ref">Quran ${dua.ref}</span></div><div class="arabic">${dua.arabic}</div><p class="translation">${dua.translation}</p></div>`;
  });

  return generateHtmlDocument('40 Rabbana Duas from the Holy Quran', body);
}

// ---- Download trigger ----
function downloadHtmlFile(htmlContent, filename) {
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---- Resources list ----
const resources = [
  {
    title: 'Authentic Morning & Evening Azkar Booklet',
    type: 'HTML Document',
    size: 'Printable',
    desc: 'Complete Arabic text with transliteration, English translation, and benefits.',
    icon: FileText,
    generator: () => downloadHtmlFile(generateAzkarBookletHtml(), 'Morning-Evening-Azkar-Booklet.html'),
  },
  {
    title: '40 Rabbana Duas from the Holy Quran',
    type: 'HTML Document',
    size: 'Printable',
    desc: 'All 40 Quranic supplications starting with Rabbana with contextual references.',
    icon: BookOpen,
    generator: () => downloadHtmlFile(generateRabbanaDuasHtml(), '40-Rabbana-Duas.html'),
  },
  {
    title: 'Islamic Geometric Wallpaper Pack (4K)',
    type: 'ZIP Archive',
    size: '14.2 MB',
    desc: 'High resolution tranquil Islamic geometric patterns for Desktop and Mobile.',
    icon: ImageIcon,
    generator: null, // Coming soon
  },
];

export default function DownloadsPage() {
  const [downloadedIdx, setDownloadedIdx] = useState(null);
  const { addToast } = useToast();

  const handleDownload = (item, idx) => {
    if (!item.generator) {
      addToast('This resource is coming soon InshaAllah!', 'info');
      return;
    }
    try {
      item.generator();
      setDownloadedIdx(idx);
      addToast(`${item.title} downloaded successfully!`, 'success');
      setTimeout(() => setDownloadedIdx(null), 3000);
    } catch (err) {
      addToast('Download failed. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeader
        title="Islamic Resources & Downloads"
        subtitle="Free high quality printable guides, dua booklets, and digital resources."
      />

      <div className="space-y-4">
        {resources.map((item, idx) => (
          <div key={item.title} className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0F5132]/10 dark:bg-[#10B981]/15 text-[#0F5132] dark:text-[#6EE7B7] flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-base text-[#1A1A1A] dark:text-[#F0EDE5] mb-1">{item.title}</h3>
                <p className="text-xs text-[#7A8578] mb-2">{item.desc}</p>
                <div className="flex items-center gap-3 text-xs text-[#7A8578]">
                  <span className="font-medium text-[#0F5132] dark:text-[#6EE7B7]">{item.type}</span>
                  <span>•</span>
                  <span>{item.size}</span>
                  {!item.generator && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[10px] font-bold">Coming Soon</span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(item, idx)}
              disabled={!item.generator}
              className={`btn-primary !py-2 !px-4 !text-xs inline-flex items-center gap-2 flex-shrink-0 ${!item.generator ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {downloadedIdx === idx ? (
                <><Check className="w-4 h-4" /> Downloaded</>
              ) : (
                <><Download className="w-4 h-4" /> Download</>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}




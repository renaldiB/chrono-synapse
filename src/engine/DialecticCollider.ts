import { CelestialNode, CollisionSynthesis, NodeType } from '../types/cosmos';

interface SynthesisPattern {
  keywordsA: string[];
  keywordsB: string[];
  titleGenerator: (a: string, b: string) => string;
  synthesisTheme: string;
  resolution: string;
  action: string;
  quote: string;
}

const PHILOSOPHICAL_PATTERNS: SynthesisPattern[] = [
  {
    keywordsA: ['ai', 'tech', 'code', 'logic', 'machine', 'algoritma', 'robot'],
    keywordsB: ['zen', 'spirituality', 'peace', 'meditasi', 'batin', 'soul', 'alam'],
    titleGenerator: (a, b) => `Cyber-Spiritualitas: ${a} ⊗ ${b}`,
    synthesisTheme: 'Penyatuan kecerdasan komputasional dengan kesadaran hening nir-batas.',
    resolution: 'Teknologi adalah cermin dari kesadaran manusia; mengoptimalkan algoritma eksternal tanpa kesadaran internal hanyalah mempercepat ilusi.',
    action: 'Terapkan "Digital Sabbath": Gunakan otomasi tingkat tinggi untuk membebaskan waktu kontemplasi murni.',
    quote: 'Di dalam keheningan terdalam, setiap baris kode adalah doa matematika semesta.'
  },
  {
    keywordsA: ['ambisi', 'sukses', 'karir', 'target', 'hustle', 'uang', 'kerja'],
    keywordsB: ['istirahat', 'tenang', 'santai', 'hidup', 'keluarga', 'syukur'],
    titleGenerator: (a, b) => `Dynamic Stillness: ${a} ⇄ ${b}`,
    synthesisTheme: 'Aksi tanpa keterikatan (Wu Wei dalam modernitas produktif).',
    resolution: 'Kecepatan sejati bukan terburu-buru, melainkan ketiadaan gesekan batin. Kerja keras yang dipadukan dengan ketenangan menghasilkan output berkekuatan kuantum.',
    action: 'Bekerja dalam blok fokus terarah 90 menit, diikuti ritual dekompresi sensorik total tanpa layar.',
    quote: 'Anak panah yang ditarik dengan tenang melesat paling jauh tanpa merusak busurnya.'
  },
  {
    keywordsA: ['disiplin', 'rutinitas', 'sistem', 'jadwal', 'konsisten', 'order'],
    keywordsB: ['kreatif', 'spontan', 'seni', 'bebas', 'imajinasi', 'chaos'],
    titleGenerator: (a, b) => `Chaos-Architecture: ${a} ◈ ${b}`,
    synthesisTheme: 'Struktur yang kokoh sebagai kanvas suci bagi kebebasan liar.',
    resolution: 'Disiplin tanpa kreativitas adalah penjara; kreativitas tanpa disiplin adalah kabut yang menguap. Jadikan jadwal sebagai pelindung ruang bermain imajinasimu.',
    action: 'Tetapkan 1 jam terjadwal setiap hari di mana aturannya adalah "tidak boleh ada aturan" (sandbox kreatif).',
    quote: 'Sungai membutuhkan tebing yang kokoh agar air liarnya bisa mengalir menjadi tenaga listrik.'
  },
  {
    keywordsA: ['takut', 'cemas', 'risiko', 'ragu', 'gagal'],
    keywordsB: ['berani', 'loncat', 'mimpi', 'visi', 'eksplorasi'],
    titleGenerator: (a, b) => `Transmuted Courage: ${a} ⨝ ${b}`,
    synthesisTheme: 'Metamorfosis energi ketakutan menjadi bahan bakar kewaspadaan tajam.',
    resolution: 'Rasa takut bukan musuh yang harus dibasmi, melainkan kompas biologis yang menunjuk tepat ke arah di mana pertumbuhan terbesarmu bersembunyi.',
    action: 'Tuliskan skenario terburuk secara detail, lalu lakukan tindakan mikro dalam 5 detik pertama sebelum amigdala membekukanmu.',
    quote: 'Keberanian bukanlah ketiadaan getaran, melainkan melangkah maju sementara lutut tetap bergetar.'
  }
];

// Algorithmic combinatorial engine for any arbitrary thoughts
export function collideThoughts(nodeA: CelestialNode, nodeB: CelestialNode): CollisionSynthesis {
  const textA = (nodeA.title + ' ' + nodeA.content).toLowerCase();
  const textB = (nodeB.title + ' ' + nodeB.content).toLowerCase();

  // Check if any specialized pattern matches
  let matchedPattern: SynthesisPattern | null = null;
  for (const pattern of PHILOSOPHICAL_PATTERNS) {
    const aMatchesA = pattern.keywordsA.some(k => textA.includes(k));
    const bMatchesB = pattern.keywordsB.some(k => textB.includes(k));
    const aMatchesB = pattern.keywordsB.some(k => textA.includes(k));
    const bMatchesA = pattern.keywordsA.some(k => textB.includes(k));

    if ((aMatchesA && bMatchesB) || (aMatchesB && bMatchesA)) {
      matchedPattern = pattern;
      break;
    }
  }

  // Harmonic Golden Ratio Frequency calculation
  const phi = 1.6180339887;
  const rawFreq = Math.round((nodeA.frequency * phi + nodeB.frequency) / 2);
  const resonanceFrequency = Math.min(963, Math.max(174, rawFreq));

  if (matchedPattern) {
    return {
      id: `synth-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: Date.now(),
      nodeA: { id: nodeA.id, title: nodeA.title, type: nodeA.type },
      nodeB: { id: nodeB.id, title: nodeB.title, type: nodeB.type },
      synthesisTitle: matchedPattern.titleGenerator(nodeA.title, nodeB.title),
      coreSynthesis: matchedPattern.synthesisTheme,
      dialecticalResolution: matchedPattern.resolution,
      quantumActionStep: matchedPattern.action,
      paradoxQuote: matchedPattern.quote,
      suggestedType: 'star',
      resonanceFrequency
    };
  }

  // Generalized Emergent Synthesis Generator
  const prefixes = ['Harmoni Relativistik', 'Paradoks Terintegrasi', 'Konstelasi Baru', 'Sintesis Kuantum', 'Resonansi Biner'];
  const verbs = ['menggabungkan', 'menyatukan esensi dari', 'menciptakan titik temu antara', 'mentransformasi'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const verb = verbs[Math.floor(Math.random() * verbs.length)];

  const synthesisTitle = `${prefix}: ${nodeA.title} × ${nodeB.title}`;
  const coreSynthesis = `Titik singgung dimensional yang ${verb} "${nodeA.title}" dengan "${nodeB.title}" menjadi sebuah aksioma baru.`;
  const dialecticalResolution = `Ketika dua kutub pemikiran saling bertabrakan dengan kecepatan tinggi, tegangan kontradiksi larut menjadi pemahaman bahwa keduanya hanyalah dua sisi dari satu kebenaran yang sama.`;
  const quantumActionStep = `Identifikasi satu titik temu di mana prinsip "${nodeA.title}" dapat mempercepat eksekusi "${nodeB.title}" dalam 48 jam ke depan.`;
  const paradoxQuote = `"Dua partikel yang tampak saling tolak di ruang sempit akan menjadi sistem orbit biner yang stabil di ruang hampa semesta."`;

  return {
    id: `synth-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now(),
    nodeA: { id: nodeA.id, title: nodeA.title, type: nodeA.type },
    nodeB: { id: nodeB.id, title: nodeB.title, type: nodeB.type },
    synthesisTitle,
    coreSynthesis,
    dialecticalResolution,
    quantumActionStep,
    paradoxQuote,
    suggestedType: (nodeA.mass + nodeB.mass > 120 ? 'star' : 'planet') as NodeType,
    resonanceFrequency
  };
}

// Purify thoughts in the black hole singularity
export function purifyThoughtInSingularity(node: CelestialNode): { wisdom: string; stardust: number } {
  const wisdomPresets = [
    `Beban "${node.title}" telah diserap ke dalam horizon peristiwa. Gravitasi melepaskan keterikatan ego, menyisakan ruang hampa yang murni untuk inspirasi baru.`,
    `Gaya pasang surut singularitas telah mereduksi paradoks "${node.title}" menjadi energi kinetik kosmik. Yang tersisa hanyalah kebijaksanaan tanpa rasa cemas.`,
    `Di pusat lubang hitam, waktu terhenti. Ingatan tentang "${node.title}" tidak hilang, melainkan terenkripsi sebagai informasi bersih di permukaan cakrawala peristiwa semesta.`
  ];

  const wisdom = wisdomPresets[Math.floor(Math.random() * wisdomPresets.length)];
  const stardust = Math.round(node.mass * 2.5 + 40);

  return { wisdom, stardust };
}

import type { EducationEntry } from './types'

/**
 * Education timeline.
 * Confirmed by Subham: one B.Tech degree, begun at Graphic Era Hill University
 * (2022–2023) and completed at IILM University, Greater Noida (2023–2026).
 * These are two phases of a single degree, not two qualifications — the UI must
 * never present them as separate awards.
 */
export const education: EducationEntry[] = [
  {
    id: 'btech',
    qualification: 'B.Tech',
    field: 'Computer Science & Engineering — Data Science',
    institution: 'IILM University, Greater Noida',
    location: 'Greater Noida, India',
    start: 'Aug 2023',
    end: 'Aug 2026',
    result: 'CGPA 8.34',
    note: 'Degree completed here, from the second year onwards. First year at Graphic Era Hill University.',
    kind: 'degree',
  },
  {
    id: 'btech-year-one',
    qualification: 'B.Tech — first year',
    field: 'Computer Science & Engineering',
    institution: 'Graphic Era Hill University',
    location: 'Dehradun, India',
    start: 'Aug 2022',
    end: 'Jul 2023',
    note: 'First year of the same degree, before migrating to IILM University.',
    kind: 'degree',
  },
  {
    id: 'class-xii',
    qualification: 'Class XII',
    field: 'Science — Physics, Chemistry, Maths, Computer Science',
    institution: 'DAV Public School, Bistupur',
    location: 'Jamshedpur, India',
    start: 'Apr 2019',
    end: 'Jul 2021',
    result: '90%',
    note: 'CBSE',
    kind: 'school',
  },
  {
    id: 'class-x',
    qualification: 'Class X',
    field: 'General studies',
    institution: 'Baldwin Farm Area High School',
    location: 'Jamshedpur, India',
    start: 'Mar 2018',
    end: 'Apr 2019',
    result: '89%',
    note: 'CBSE',
    kind: 'school',
  },
]

export const degree = education[0]

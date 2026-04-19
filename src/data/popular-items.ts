
export interface PopularItem {
    name: string;
    description: string;
    image: string;
    href: string;
}

export const popularItems: Record<string, PopularItem[]> = {
    'dil-okullari': [
        {
            name: 'Londra',
            description: 'İngiltere\'nin kalbinde, her bütçeye uygun yüzlerce okul seçeneği.',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
            href: '/dil-okullari/ingiltere'
        },
        {
            name: 'Dublin',
            description: 'Çalışma izinli dil eğitimi için Avrupa\'nın en popüler merkezi.',
            image: 'https://images.unsplash.com/photo-1602797882193-51cb0e037534?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZHVibGlufGVufDB8fDB8fHww',
            href: '/dil-okullari/irlanda'
        },
        {
            name: 'Berlin',
            description: 'Avrupa\'nın teknoloji ve sanat başkentinde Almanca öğrenin.',
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800',
            href: '/dil-okullari/almanya'
        },
        {
            name: 'New York',
            description: 'Asla uyumayan şehirde, dünya standartlarında dil eğitimi.',
            image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800',
            href: '/dil-okullari/amerika'
        },
        {
            name: 'Toronto',
            description: 'Geniş sosyal imkanlar ve güvenli bir ortamda İngilizce eğitimi.',
            image: 'https://plus.unsplash.com/premium_photo-1694475481348-7cbe417be129?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9yb250b3xlbnwwfHwwfHx8MA%3D%3D',
            href: '/dil-okullari/kanada'
        },
        {
            name: 'St. Julians (Malta)',
            description: 'Akdeniz güneşi eşliğinde, ekonomik ve eğlenceli dil kursları.',
            image: 'https://images.unsplash.com/photo-1645097146323-a6c1478b0774?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3QuJTIwSnVsaWFucyUyMChNYWx0YSl8ZW58MHx8MHx8fDA%3D',
            href: '/dil-okullari/malta'
        }
    ],
    'yurtdisinda-universite': [
        {
            name: 'Oxford',
            description: 'Dünyanın en prestijli akademik geleneğine ilk adımı atın.',
            image: 'https://images.unsplash.com/photo-1472121779802-43c68a9f405f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b3hmb3JkfGVufDB8fDB8fHwy',
            href: '/yurtdisinda-universite/ingiltere'
        },
        {
            name: 'Boston',
            description: 'Amerika\'nın eğitim başkentinde Harvard ve MIT komşuluğunda eğitim.',
            image: 'https://images.unsplash.com/photo-1565127803082-69dd82351360?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9zdG9ufGVufDB8fDB8fHwy',
            href: '/yurtdisinda-universite/amerika'
        },
        {
            name: 'Münih',
            description: 'Uluslararası düzeyde ücretsiz teknik eğitim fırsatları.',
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800',
            href: '/yurtdisinda-universite/almanya'
        },
        {
            name: 'Amsterdam',
            description: 'Yüksek kaliteli İngilizce lisans programları ile Avrupa\'nın kalbi.',
            image: 'https://images.unsplash.com/photo-1584003564911-a7a321c84e1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1zdGVyZGFtfGVufDB8fDB8fHwy',
            href: '/yurtdisinda-universite/hollanda'
        }
    ],
    'yuksek-lisans': [
        {
            name: 'LSE (Londra)',
            description: 'Ekonomi ve siyaset bilimlerinde dünyanın zirvesinde uzmanlaşın.',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
            href: '/yuksek-lisans/ingiltere'
        },
        {
            name: 'INSEAD (Fontainebleau)',
            description: 'Liderlik ve MBA alanında Avrupa\'nın en prestijli eğitimini alın.',
            image: 'https://images.unsplash.com/photo-1502602894657-3e146c539810?q=80&w=800',
            href: '/yuksek-lisans/fransa'
        },
        {
            name: 'Stanford (California)',
            description: 'İnovasyon ve girişimciliğin merkezinde akademik kariyer.',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800',
            href: '/yuksek-lisans/amerika'
        },
        {
            name: 'ETH Zurich',
            description: 'Mühendislik ve teknoloji alanında dünya standartlarında araştırma.',
            image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=800',
            href: '/yuksek-lisans/isvicre'
        }
    ],
    'yaz-okulu': [
        {
            name: 'UCLA (Los Angeles)',
            description: 'Amerika\'nın en ikonik kampüsünde unutulmaz bir yaz deneyimi.',
            image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800',
            href: '/yaz-okulu/amerika'
        },
        {
            name: 'Oxford Summer',
            description: 'Tarihi kolej binalarında akademik ve sosyal yaz kampları.',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800',
            href: '/yaz-okulu/ingiltere'
        },
        {
            name: 'St. Andrews (İskoçya)',
            description: 'Geleneksel ve prestijli bir ortamda dil ve aktivite odaklı yaz okulu.',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
            href: '/yaz-okulu/ingiltere'
        }
    ]
};

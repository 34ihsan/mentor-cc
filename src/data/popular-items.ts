
export interface PopularItem {
    name: string;
    description: string;
    image: string;
    href: string;
}

export const popularItems: Record<string, PopularItem[]> = {
    'yurtdisi-dil-okullari': [
        {
            name: 'Londra',
            description: 'İngiltere\'nin kalbinde, her bütçeye uygun yüzlerce okul seçeneği.',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
            href: '/yurtdisi-dil-okullari/ingiltere'
        },
        {
            name: 'Dublin',
            description: 'Çalışma izinli dil eğitimi için Avrupa\'nın en popüler merkezi.',
            image: 'https://images.unsplash.com/photo-1500456759136-362ab38eec6d?auto=format&fit=crop&q=80&w=1200',
            href: '/yurtdisi-dil-okullari/irlanda'
        },
        {
            name: 'Berlin',
            description: 'Avrupa\'nın teknoloji ve sanat başkentinde Almanca öğrenin.',
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800',
            href: '/yurtdisi-dil-okullari/almanya'
        },
        {
            name: 'New York',
            description: 'Asla uyumayan şehirde, dünya standartlarında dil eğitimi.',
            image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800',
            href: '/yurtdisi-dil-okullari/amerika'
        },
        {
            name: 'Toronto',
            description: 'Geniş sosyal imkanlar ve güvenli bir ortamda İngilizce eğitimi.',
            image: 'https://plus.unsplash.com/premium_photo-1694475481348-7cbe417be129?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9yb250b3xlbnwwfHwwfHx8MA%3D%3D',
            href: '/yurtdisi-dil-okullari/kanada'
        },
        {
            name: 'St. Julians (Malta)',
            description: 'Akdeniz güneşi eşliğinde, ekonomik ve eğlenceli dil kursları.',
            image: 'https://images.unsplash.com/photo-1587974928552-4f4aac51b45d?auto=format&fit=crop&q=80&w=1200',
            href: '/yurtdisi-dil-okullari/malta'
        }
    ],
    'yurtdisi-universite': [
        {
            name: 'Oxford',
            description: 'Dünyanın en prestijli akademik geleneğine ilk adımı atın.',
            image: 'https://images.unsplash.com/photo-1472121779802-43c68a9f405f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b3hmb3JkfGVufDB8fDB8fHwy',
            href: '/yurtdisi-universite/ingiltere'
        },
        {
            name: 'Boston',
            description: 'Amerika\'nın eğitim başkentinde Harvard ve MIT komşuluğunda eğitim.',
            image: 'https://images.unsplash.com/photo-1565127803082-69dd82351360?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9zdG9ufGVufDB8fDB8fHwy',
            href: '/yurtdisi-universite/amerika'
        },
        {
            name: 'Münih',
            description: 'Uluslararası düzeyde ücretsiz teknik eğitim fırsatları.',
            image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800',
            href: '/yurtdisi-universite/almanya'
        },
        {
            name: 'Amsterdam',
            description: 'Yüksek kaliteli İngilizce lisans programları ile Avrupa\'nın kalbi.',
            image: 'https://images.unsplash.com/photo-1584003564911-a7a321c84e1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1zdGVyZGFtfGVufDB8fDB8fHwy',
            href: '/yurtdisi-universite/hollanda'
        }
    ],
    'yurtdisi-yuksek-lisans': [
        {
            name: 'LSE (Londra)',
            description: 'Ekonomi ve siyaset bilimlerinde dünyanın zirvesinde uzmanlaşın.',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
            href: '/yurtdisi-yuksek-lisans/ingiltere'
        },
        {
            name: 'INSEAD (Fontainebleau)',
            description: 'Liderlik ve MBA alanında Avrupa\'nın en prestijli eğitimini alın.',
            image: 'https://images.unsplash.com/photo-1650211233795-922f366885f9?q=80&w=1200',
            href: '/yurtdisi-yuksek-lisans/fransa'
        },
        {
            name: 'Stanford (California)',
            description: 'İnovasyon ve girişimciliğin merkezinde akademik kariyer.',
            image: 'https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=1200',
            href: '/yurtdisi-yuksek-lisans/amerika'
        },
        {
            name: 'ETH Zurich',
            description: 'Mühendislik ve teknoloji alanında dünya standartlarında araştırma.',
            image: 'https://images.unsplash.com/photo-1524317079201-9a7444c9b3fc?auto=format&fit=crop&q=80&w=1200',
            href: '/yurtdisi-yuksek-lisans/isvicre'
        }
    ],
    'yurtdisi-yaz-okullari': [
        {
            name: 'UCLA (Los Angeles)',
            description: 'Amerika\'nın en ikonik kampüsünde unutulmaz bir yaz deneyimi.',
            image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800',
            href: '/yurtdisi-yaz-okullari/amerika'
        },
        {
            name: 'Oxford Summer',
            description: 'Tarihi kolej binalarında akademik ve sosyal yaz kampları.',
            image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800',
            href: '/yurtdisi-yaz-okullari/ingiltere'
        },
        {
            name: 'St. Andrews (İskoçya)',
            description: 'Geleneksel ve prestijli bir ortamda dil ve aktivite odaklı yaz okulu.',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
            href: '/yurtdisi-yaz-okullari/ingiltere'
        }
    ],
    'yurtdisi-lise': [
         {
            name: 'London High School',
            description: 'İngiltere\'nin en köklü liselerinde lise eğitimi.',
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800',
            href: '/yurtdisi-lise/ingiltere'
        }
    ]
};

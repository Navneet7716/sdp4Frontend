import React from 'react'
import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';


function PdftoJpeg() {

    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
      ? theme.colors.dark[1]
      : theme.colors.gray[7];
  return (
    <div style={{ width: 340, margin: 'auto' }}>
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image src="./JPEG.png" height={160} alt="Norway" fit='contain'/>
      </Card.Section>

      <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
        <Text weight={500}>Convert from JPEG to PDF</Text>
        <Badge color="green" variant="light">
         new
        </Badge>
      </Group>

      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        With our best in class converter you don't need to worry no more, easily convert your awesome jpgs into a pdf file
        and share with the world
      </Text>

      <Button variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
        Convert
      </Button>
    </Card>
  </div>
  )
}

export default PdftoJpeg
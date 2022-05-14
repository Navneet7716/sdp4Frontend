import React from 'react'
import { Card, Image, Text, Badge, Button, Group, useMantineTheme } from '@mantine/core';
import "./PdftoJpeg.css"
import { Link } from "react-router-dom";


function ConvertCard({ bannerImage, Heading, Description, Convertlink }) {

    const theme = useMantineTheme();

    const secondaryColor = theme.colorScheme === 'dark'
      ? theme.colors.dark[1]
      : theme.colors.gray[7];
  return (
    <div style={{ width: 340, margin: 'auto' }} class="zoom">
    <Card shadow="sm" p="lg">
      <Card.Section>
        <Image src={bannerImage} height={160} alt="Norway" fit='contain'/>
      </Card.Section>

      <Group position="apart" style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
        <Text weight={500}>{Heading}</Text>
        <Badge color="green" variant="light">
         new
        </Badge>
      </Group>

      <Text size="sm" style={{ color: secondaryColor, lineHeight: 1.5 }}>
        {Description}
      </Text>


    <Button component={Link} to={`/convert/${Convertlink}`}  variant="light" color="blue" fullWidth style={{ marginTop: 14 }}>
      Convert
    </Button>
  
    </Card>
  </div>
  )
}

export default ConvertCard